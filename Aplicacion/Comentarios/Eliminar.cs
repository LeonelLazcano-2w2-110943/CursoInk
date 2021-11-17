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
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public Guid ComentarioId { get; set; }
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
                var comentario = await _context.Comentario.FindAsync(request.ComentarioId);
                if (comentario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontro el comentario" });

                comentario.Activo = !comentario.Activo;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al eliminar el comentario");
            }
        }
    }
}
