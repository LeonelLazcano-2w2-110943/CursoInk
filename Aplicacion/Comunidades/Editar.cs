using Aplicacion.Contratos;
using Aplicacion.ManejadorError;
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

namespace Aplicacion.Comunidades
{
    public class Editar
    {
        public class Ejecuta : IRequest
        {
            public Guid ComunidadId { get; set; }
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public string Reglas { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.ComunidadId).NotEmpty();
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
                RuleFor(x => x.Reglas).NotEmpty();
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
                var comunidad = await _context.Comunidad.FindAsync(request.ComunidadId);
                if (comunidad == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se pudo encontrar la comunidad" });

                var userName = _usuarioSesion.ObtenerUsuarioSesion();
                if (userName == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "usuario no encontrado" });
                var usuario = await _userManager.FindByNameAsync(userName);
                if (!usuario.Id.Equals(comunidad.UsuarioCreadorId)) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Solo el usuario que creó la comunidad puede editar la misma " });

                comunidad.Nombre = request.Nombre;
                comunidad.Descripcion = request.Descripcion;
                comunidad.Reglas = request.Reglas;
                comunidad.FechaModificacion = DateTime.Now;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al editar la comunidad");
            }
        }
    }
}
