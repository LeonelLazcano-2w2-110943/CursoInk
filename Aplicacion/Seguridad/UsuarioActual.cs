using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
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
    public class UsuarioActual
    {
        public class Ejecuta : IRequest<UsuarioData> { }

        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly IJwtGenerador _jwtGenerador;
            private readonly IUsuarioSesion _usuarioSesion;
            private readonly CursoInkContext _context;
            public Manejador(UserManager<Usuario> userManager, IJwtGenerador jwtGenerador, IUsuarioSesion usuarioSesion, CursoInkContext context)
            {
                _userManager = userManager;
                _jwtGenerador = jwtGenerador;
                _usuarioSesion = usuarioSesion;
                _context = context;
            }
            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByNameAsync(_usuarioSesion.ObtenerUsuarioSesion());
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Usuario no encontrado" });

                var resultadoRoles = await _userManager.GetRolesAsync(usuario);
                var listaRoles = new List<string>(resultadoRoles);

                var imagenPerfil = await _context.Documento.Where(x => x.ObjetoReferencia == new Guid(usuario.Id)).FirstOrDefaultAsync();
                if(imagenPerfil != null)
                {
                    var imagenCliente = new ImagenGeneral
                    {
                        Data = Convert.ToBase64String(imagenPerfil.Contenido),
                        Extension = imagenPerfil.Extension,
                        Nombre = imagenPerfil.Nombre
                    };

                    return new UsuarioData
                    {
                        UsuarioId = usuario.Id,
                        NombreCompleto = usuario.NombreCompleto,
                        UserName = usuario.UserName,
                        Token = _jwtGenerador.CrearToken(usuario, listaRoles),
                        Imagen = null,
                        Activo = usuario.Activo,
                        Email = usuario.Email,
                        Biografia = usuario.Biografia,
                        ListaRoles = listaRoles,
                        ImagenPerfil = imagenCliente
                    };
                }
                else
                {
                    return new UsuarioData
                    {
                        UsuarioId = usuario.Id,
                        NombreCompleto = usuario.NombreCompleto,
                        UserName = usuario.UserName,
                        Token = _jwtGenerador.CrearToken(usuario, listaRoles),
                        Activo = usuario.Activo,
                        Email = usuario.Email,
                        Biografia = usuario.Biografia,
                        ListaRoles = listaRoles
                    };
                }
            }
        }
    }
}
