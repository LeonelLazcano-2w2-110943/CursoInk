using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public Guid CursoId { get; set; }
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public List<string> ListaInstructor { get; set; }

        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IUsuarioSesion _usuarioSesion;
            public Manejador(CursoInkContext context, IUsuarioSesion usuarioSesion, UserManager<Usuario> userManager)
            {
                _context = context;
                _usuarioSesion = usuarioSesion;
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var userName = _usuarioSesion.ObtenerUsuarioSesion();
                var instructorCreador = await _userManager.FindByNameAsync(userName);
                if (instructorCreador == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el instructor" });
                var curso = await _context.Curso.FindAsync(request.CursoId);
                if (curso == null)
                {
                    throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el curso" });
                }

                curso.Titulo = request.Titulo ?? curso.Titulo;
                curso.Descripcion = request.Descripcion ?? curso.Descripcion;
                curso.FechaModificacion = DateTime.Now;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0)
                {
                    return Unit.Value;
                }

                throw new Exception("No se pudo modificar el curso");
            }
        }
    }
}
