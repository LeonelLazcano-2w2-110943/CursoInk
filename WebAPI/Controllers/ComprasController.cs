using Aplicacion.Compras;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComprasController : MiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<Unit>> Crear(Nueva.Ejecuta data)
        {
            return await mediator.Send(data);
        }

        [HttpGet]
        public async Task<ActionResult<List<CompraDTO>>> ListaComprasPorUsuario()
        {
            return await mediator.Send(new ComprasPorUsuario.Ejecuta());
        }
    }
}
