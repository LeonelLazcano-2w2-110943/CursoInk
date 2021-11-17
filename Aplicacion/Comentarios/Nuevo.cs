using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Comentarios
{
    public class Nuevo
    {
        public class Ejecuta : IRequest
        {
            public string Alumno { get; set; }
            public string ComentarioTexto { get; set; }
            public Guid? CursoId { get; set; }
            public Guid? TemaId { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Alumno).NotEmpty();
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
                Guid _comentarioId = Guid.NewGuid();
                var comentario = new Comentario
                {
                    ComentarioId = _comentarioId,
                    Alumno = request.Alumno,
                    ComentarioTexto = request.ComentarioTexto,
                    FechaCreacion = DateTime.Now,
                    Activo = true,
                    CursoId = request.CursoId ?? request.CursoId,
                    TemaId = request.TemaId ?? request.TemaId
                };

                _context.Comentario.Add(comentario);
                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("No se pudo agregar el comentario");
            }
        }
    }
}
