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

namespace Aplicacion.Cursos
{
    public class Eliminar
    {
        public class Ejecuta : IRequest
        {
            public Guid CursoId { get; set; }
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
                var curso = await _context.Curso.FindAsync(request.CursoId);
                if (curso == null)
                {
                    throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el curso" });
                }
                curso.Activo = !curso.Activo;
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
