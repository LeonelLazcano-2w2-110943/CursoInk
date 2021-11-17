using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
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
    public class UsuarioRolEliminar
    {
        public class Ejecuta : IRequest
        {
            public string UserName { get; set; }
            public string RolNombre { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.RolNombre).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly UserManager<Usuario> _userManager;
            private readonly RoleManager<IdentityRole> _rolManager;
            public Manejador(UserManager<Usuario> userManager, RoleManager<IdentityRole> rolManager)
            {
                _userManager = userManager;
                _rolManager = rolManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var role = await _rolManager.FindByNameAsync(request.RolNombre);
                if (role == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el rol" });

                var usuario = await _userManager.FindByNameAsync(request.UserName);
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el usuario" });

                var resultado = await _userManager.RemoveFromRoleAsync(usuario, request.RolNombre);

                if (resultado.Succeeded) return Unit.Value;

                throw new Exception("Error al eliminar el rol del usuario");
            }
        }
    }
}
