using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Aplicacion.Temas;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemasController: MiControllerBase
    {
        [HttpPost("{id}")]
        public async Task<ActionResult<Unit>> Crear(Guid id, Nuevo.Ejecuta data)
        {
            data.ComunidadId = id;
            return await mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(Guid id, Editar.Ejecuta data)
        {
            data.TemaId = id;
            return await mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await mediator.Send(new Eliminar.Ejecuta { TemaId = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<TemaDTO>>> GetLista()
        {
            return await mediator.Send(new Lista.Ejecuta());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TemaDTO>> GetId(Guid id)
        {
            return await mediator.Send(new ConsultaId.Ejecuta { TemaId = id });
        }
    }
}
