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

namespace Aplicacion.Temas
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public Guid TemaId { get; set; }
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.TemaId).NotEmpty();
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            private readonly IUsuarioSesion _usuarioSesion;
            private readonly UserManager<Usuario> _userManager;
            public Manejador(CursoInkContext context, IUsuarioSesion usuarioSesion, UserManager<Usuario> userManager)
            {
                _context = context;
                _usuarioSesion = usuarioSesion;
                _userManager = userManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var tema = await _context.Tema.FindAsync(request.TemaId);
                if (tema == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el tema" });

                var userName = _usuarioSesion.ObtenerUsuarioSesion();
                var usuario = await _userManager.FindByNameAsync(userName);
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontro el usuario" });
                if(!usuario.Id.Equals(tema.UsuarioCreadorId)) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Solo el usuario que creó tema puede editar el mismo" });

                tema.Titulo = request.Titulo;
                tema.Descripcion = request.Descripcion;
                tema.FechaModificacion = DateTime.Now;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al editar el tema");
            }
        }
    }
}
