using Aplicacion.Reportes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : MiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Reportes>> GetReportes()
        {
            return await mediator.Send(new GetReportes.Ejecuta());
        }
    }
}
