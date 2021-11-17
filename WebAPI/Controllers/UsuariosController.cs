using Aplicacion.Seguridad;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [AllowAnonymous]
    public class UsuariosController : MiControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<UsuarioData>> Crear(Login.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioData>> Registrar(Registrar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPut]
        public async Task<ActionResult<UsuarioData>> Editar(UsuarioActualizar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet]
        public async Task<ActionResult<UsuarioData>> GetUsuario()
        {
            return await mediator.Send(new UsuarioActual.Ejecuta());
        }

        [HttpDelete]
        public async Task<ActionResult<Unit>> Eliminar()
        {
            return await mediator.Send(new UsuarioBaja.Ejecuta());
        }
    }
}
