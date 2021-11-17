using Aplicacion.Cursos;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistencia.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursosController : MiControllerBase
    {
        [HttpPost("listaCursos")]
        public async Task<ActionResult<PaginacionModel>> GetCursos(Consulta.ListaCursos data)
        {
            return await mediator.Send(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CursoDTO>> Detalle(Guid id)
        {
            return await mediator.Send(new ConsultaId.CursoUnico { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nuevo.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Modificar(Guid id, Editar.Ejecuta data)
        {
            data.CursoId = id;
            return await mediator.Send(data);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Eliminar(Guid id)
        {
            return await mediator.Send(new Eliminar.Ejecuta { CursoId = id});
        }

        [HttpPost("suscribir")]
        public async Task<ActionResult<Unit>> Suscribir(Subscripcion.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpPost("report")]
        public async Task<ActionResult<PaginacionModel>> ReportCurso(Consulta.ListaCursos data)
        {
            return await mediator.Send(data);
        }
    }
}
