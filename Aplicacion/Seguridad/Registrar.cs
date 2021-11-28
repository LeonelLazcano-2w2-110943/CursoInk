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
    public class Registrar
    {
        public class Ejecuta : IRequest<UsuarioData>
        {
            public string NombreCompleto { get; set; }
            public string Email {get; set;}
            public string Password {get; set;}
            public string UserName {get; set; }
            public string Biografia {get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.NombreCompleto).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly CursoInkContext _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IJwtGenerador _jwtGenerador;
            public Manejador(CursoInkContext context, UserManager<Usuario> userManager, IJwtGenerador jwtGenerador)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerador = jwtGenerador;
            }
            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var existe = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();
                if (existe) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "El Email ya se encuentra registrado" });

                var existeUserName = await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync();
                if(existeUserName) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "El UserName ya se encuentra registrado" });

                var usuario = new Usuario
                {
                    NombreCompleto = request.NombreCompleto,
                    Email = request.Email,
                    Activo = true,
                    UserName = request.UserName,
                    Biografia = request.Biografia == null ? null : request.Biografia,
                    FechaCreacion = DateTime.Now
                };

                var resultado = await _userManager.CreateAsync(usuario, request.Password);
                if (resultado.Succeeded)
                {
                    return new UsuarioData
                    {
                        NombreCompleto = usuario.NombreCompleto,
                        Token = _jwtGenerador.CrearToken(usuario, null),
                        UserName = usuario.UserName,
                        Email = usuario.Email,
                        Biografia = usuario.Biografia,
                        Activo = usuario.Activo,
                        UsuarioId = usuario.Id
                    };
                }

                throw new Exception("Error al registrar usuario");
            }
        }
    }
}
