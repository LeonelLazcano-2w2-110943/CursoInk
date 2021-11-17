using Aplicacion.Comentarios;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentariosController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nuevo.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPost("editarComentario")]
        public async Task<ActionResult<Unit>> Editar(Editar.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await mediator.Send(new Eliminar.Ejecuta { ComentarioId = id});
        }
    }
}
