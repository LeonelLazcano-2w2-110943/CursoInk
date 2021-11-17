using Aplicacion.ManejadorError;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Comunidades
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public Guid ComunidadId { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            public Manejador(CursoInkContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var comunidad = await _context.Comunidad.FindAsync(request.ComunidadId);
                if (comunidad == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se pudo encontrar la comunidad" });

                comunidad.Activo = !comunidad.Activo;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al eliminar la comunidad");
            }
        }
    }
}
