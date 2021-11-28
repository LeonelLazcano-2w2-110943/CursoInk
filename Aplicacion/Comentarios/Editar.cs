using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Comentarios
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public Guid? ComentarioId { get; set; }
            public Guid? TemaId { get; set; }
            public string ComentarioTexto { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.ComentarioTexto).NotEmpty();
            }
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
                if (request.ComentarioId != null) {
                    var comentario = await _context.Comentario.FindAsync(request.ComentarioId);
                    if (comentario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se pudo encontrar el comentarioen el curso" });
                    comentario.ComentarioTexto = request.ComentarioTexto;
                    comentario.FechaModificacion = DateTime.Now;
                }

                if (request.TemaId != null)
                {
                    var comentario = await _context.Comentario.FindAsync(request.TemaId);
                    if (comentario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se pudo encontrar el comentario" });
                    comentario.ComentarioTexto = request.ComentarioTexto;
                    comentario.FechaModificacion = DateTime.Now;
                }

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al modificar el comentario");
            }
        }
    }
}
