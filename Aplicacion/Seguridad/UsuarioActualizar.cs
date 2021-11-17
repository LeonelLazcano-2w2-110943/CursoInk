using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class UsuarioActualizar
    {
        public class Ejecuta : IRequest<UsuarioData>
        {
            public string NombreCompleto { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string UserName { get; set; }
            public string Biografia { get; set; }
            public ImagenGeneral ImagenPerfil { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.NombreCompleto).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Biografia).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly CursoInkContext _context;
            private readonly IJwtGenerador _jwtGenerador;
            private readonly IPasswordHasher<Usuario> _passwordHasher;
            public Manejador(UserManager<Usuario> userManager, CursoInkContext context, IJwtGenerador jwtGenerador, IPasswordHasher<Usuario> passwordHasher)
            {
                _userManager = userManager;
                _context = context;
                _jwtGenerador = jwtGenerador;
                _passwordHasher = passwordHasher;
            }
            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByNameAsync(request.UserName);
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "usuario no encontrado" });

                var existeEmail = await _context.Users.Where(x => x.Email == request.Email && x.UserName != request.UserName).AnyAsync();
                if (existeEmail) throw new ManejadorException(HttpStatusCode.InternalServerError, new { mensaje = "Este email pertenece a otro usuario" });

                if(request.ImagenPerfil != null)
                {
                    var resultadoImagen = await _context.Documento.Where(x => x.ObjetoReferencia == new Guid(usuario.Id)).FirstOrDefaultAsync();
                    if (resultadoImagen == null)
                    {
                        var imagen = new Documento
                        {
                            Contenido = Convert.FromBase64String(request.ImagenPerfil.Data),
                            Nombre = request.ImagenPerfil.Nombre,
                            Extension = request.ImagenPerfil.Extension,
                            ObjetoReferencia = new Guid(usuario.Id),
                            DocumentoId = Guid.NewGuid(),
                            FechaCreacion = DateTime.Now
                        };
                        _context.Documento.Add(imagen);
                    }
                    else
                    {
                        resultadoImagen.Contenido = Convert.FromBase64String(request.ImagenPerfil.Data);
                        resultadoImagen.Nombre = request.ImagenPerfil.Nombre;
                        resultadoImagen.Extension = request.ImagenPerfil.Extension;
                    }
                }

                usuario.NombreCompleto = request.NombreCompleto;
                usuario.PasswordHash = _passwordHasher.HashPassword(usuario, request.Password);
                usuario.Email = request.Email;
                usuario.Biografia = request.Biografia;
                usuario.FechaModificacion = DateTime.Now;

                var resultado = await _userManager.UpdateAsync(usuario);

                var resultadoRoles = await _userManager.GetRolesAsync(usuario);
                var listaRoles = new List<string>(resultadoRoles);

                var imagenPerfil = await _context.Documento.Where(x => x.ObjetoReferencia == new Guid(usuario.Id)).FirstAsync();
                ImagenGeneral imagenGeneral = null;
                if(imagenPerfil != null)
                {
                    imagenGeneral = new ImagenGeneral
                    {
                        Data = Convert.ToBase64String(imagenPerfil.Contenido),
                        Nombre = imagenPerfil.Nombre,
                        Extension = imagenPerfil.Extension,
                    };
                }

                if (resultado.Succeeded)
                {
                    return new UsuarioData
                    {
                        NombreCompleto = usuario.NombreCompleto,
                        UserName = usuario.UserName,
                        Email = usuario.Email,
                        Token = _jwtGenerador.CrearToken(usuario, listaRoles),
                        Biografia = usuario.Biografia,
                        Activo = usuario.Activo,
                        ImagenPerfil = imagenGeneral
                    };
                }

                throw new Exception("Error al actualizar el usuario");
            }
        }
    }
}
