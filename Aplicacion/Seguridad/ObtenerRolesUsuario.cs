using Aplicacion.ManejadorError;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class ObtenerRolesUsuario
    {
        public class Ejecuta : IRequest<List<string>>
        {
            public string UserName { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta, List<string>>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly RoleManager<IdentityRole> _rolManager;
            public Manejador(UserManager<Usuario> userManager, RoleManager<IdentityRole> rolManager)
            {
                _userManager = userManager;
                _rolManager = rolManager;
            }
            public async Task<List<string>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByNameAsync(request.UserName);
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el usuario" });

                var resultado = await _userManager.GetRolesAsync(usuario);

                return new List<string>(resultado);

                throw new Exception("Error al eliminar el rol del usuario");
            }
        }
    }
}
