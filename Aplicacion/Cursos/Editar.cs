using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
using Aplicacion.Seguridad;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
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
            public string VideoUrl { get; set; }
            public decimal Precio { get; set; }
            public List<string> ListaInstructor { get; set; }
            public ImagenGeneral ImagenCurso { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
                RuleFor(x => x.VideoUrl).NotEmpty();
                RuleFor(x => x.Precio).NotEmpty();
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
                curso.VideoUrl = request.VideoUrl ?? curso.VideoUrl;
                curso.Precio = request.Precio;
                curso.FechaModificacion = DateTime.Now;
                if (request.ImagenCurso != null)
                {
                    var resultadoImagen = await _context.Documento.Where(x => x.ObjetoReferencia == curso.CursoId).FirstOrDefaultAsync();
                    if (resultadoImagen == null)
                    {
                        var imagen = new Documento
                        {
                            Contenido = Convert.FromBase64String(request.ImagenCurso.Data),
                            Nombre = request.ImagenCurso.Nombre,
                            Extension = request.ImagenCurso.Extension,
                            ObjetoReferencia = curso.CursoId,
                            DocumentoId = Guid.NewGuid(),
                            FechaCreacion = DateTime.Now
                        };
                        _context.Documento.Add(imagen);
                    }
                    else
                    {
                        resultadoImagen.Contenido = Convert.FromBase64String(request.ImagenCurso.Data);
                        resultadoImagen.Nombre = request.ImagenCurso.Nombre;
                        resultadoImagen.Extension = request.ImagenCurso.Extension;
                    }
                }

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
