using Aplicacion.ManejadorError;
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
    public class GetRole
    {
        public class Ejecuta : IRequest<RolDTO>
        {
            public string Id { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta, RolDTO>
        {
            private readonly RoleManager<IdentityRole> _rolManager;
            public Manejador(RoleManager<IdentityRole> rolManager)
            {
                _rolManager = rolManager;
            }
            public async Task<RolDTO> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var dto = new RolDTO();
                var rol = await _rolManager.FindByIdAsync(request.Id);
                if (rol == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el rol" });

                dto.Name = rol.Name;
                dto.Id = rol.Id;
                return dto;

                throw new Exception("Error al obtener el rol");
            }
        }
    }
}
