using Aplicacion.Comunidades;
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
    public class ComuninadesController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nuevo.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Editar(Guid id, Editar.Ejecuta data)
        {
            data.ComunidadId = id;
            return await mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await mediator.Send(new Eliminar.Ejecuta { ComunidadId=id});
        }

        [HttpGet]
        public async Task<ActionResult<List<ComunidadDTO>>> GetLista()
        {
            return await mediator.Send(new Lista.Ejecuta());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComunidadDTO>> GetId(Guid id)
        {
            return await mediator.Send(new ConsultaId.Ejecuta { Id = id });
        }

        [HttpGet("ComunidadPorUsuario")]
        public async Task<ActionResult<List<ComunidadDTO>>> ListaComunidadesPorUsuario()
        {
            return await mediator.Send(new ComunidadesPorUsuarios.Ejecuta());
        }
    }
}
