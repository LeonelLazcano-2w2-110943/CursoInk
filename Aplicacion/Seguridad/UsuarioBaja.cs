using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class UsuarioBaja
    {
        public class Ejecuta : IRequest
        {
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly IUsuarioSesion _usuarioSesion;
            public Manejador(UserManager<Usuario> userManager, IUsuarioSesion usuarioSesion)
            {
                _userManager = userManager;
                _usuarioSesion = usuarioSesion;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByNameAsync(_usuarioSesion.ObtenerUsuarioSesion());
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "El usuario no existe" });

                usuario.Activo = !usuario.Activo;

                var resultado = await _userManager.UpdateAsync(usuario);
                if (resultado.Succeeded) return Unit.Value;

                throw new Exception("Error al dar de baja el usuario");
            }
        }
    }
}
