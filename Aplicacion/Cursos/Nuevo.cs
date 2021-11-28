using Dominio;
using FluentValidation;
using MediatR;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class Nuevo
    {
        public class Ejecuta : IRequest
        {
            public Guid? CursoId { get; set; }
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public string UsuarioCreadorId { get; set; }
            public string VideoUrl { get; set; }
            public decimal Precio { get; set; }
            public List<string> InstructorLista { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
                RuleFor(x => x.Precio).NotEmpty();
                RuleFor(x => x.VideoUrl).NotEmpty();
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
                Guid _cursoId = Guid.NewGuid();
                if (request.CursoId != null) _cursoId = request.CursoId ?? Guid.NewGuid();
                var curso = new Curso
                {
                    CursoId = _cursoId,
                    Titulo = request.Titulo,
                    Descripcion = request.Descripcion,
                    UsuarioCreadorId = request.UsuarioCreadorId,
                    VideoUrl = request.VideoUrl,
                    FechaCreacion = DateTime.Now,
                    Activo = true,
                    Precio = request.Precio
                };

                _context.Curso.Add(curso);
                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("No se pudo insertar el curso");
            }
                
        }
    }
}
