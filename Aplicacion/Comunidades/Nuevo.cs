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

namespace Aplicacion.Comunidades
{
    public class Nuevo
    {
        public class Ejecuta : IRequest
        {
            public string Nombre { get; set; }
            public string Descripcion { get; set; }
            public string Reglas { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
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
                var guid = new Guid();
                var userName = _usuarioSesion.ObtenerUsuarioSesion();
                var usuario = await _userManager.FindByNameAsync(userName);
                var nuevo = new Comunidad
                {
                    ComunidadId = guid,
                    Nombre = request.Nombre,
                    Descripcion = request.Descripcion,
                    Reglas = request.Reglas,
                    FechaCreacion = DateTime.Now,
                    Activo = true,
                    UsuarioCreadorId = usuario.Id
                };
                _context.Comunidad.Add(nuevo);

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al crear la comunidad");
            }
        }
    }
}
