using Aplicacion.Seguridad;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    public class RolController : MiControllerBase
    {
        [Authorize(Roles = "Admin")]
        [HttpPost("crear")]
        public async Task<ActionResult<Unit>> Crear(RolNuevo.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult<Unit>> Eliminar(string id)
        {
            return await mediator.Send(new RolEliminar.Ejecuta { Id = id });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<IdentityRole>>> ListaRoles()
        {
            return await mediator.Send(new RolLista.Ejecuta());
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Unit>> Modificar(RolModificar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("agregarRolUsuario")]
        public async Task<ActionResult<Unit>> AgregarRolUsuario(UsuarioRolAgregar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("eliminarRolUsuario")]
        public async Task<ActionResult<Unit>> EliminarRolUsuario(UsuarioRolEliminar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{userName}")]
        public async Task<ActionResult<List<string>>> ObtenerRolesUsuario(string userName)
        {
            return await mediator.Send(new ObtenerRolesUsuario.Ejecuta { UserName = userName });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("getRol/{id}")]
        public async Task<ActionResult<RolDTO>> ObtenerRol(string id)
        {
            return await mediator.Send(new GetRole.Ejecuta { Id = id });
        }

    }
}
