using Aplicacion.Contratos;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
    public class Nuevo
    {
        public class Ejecuta : IRequest
        {
            public string Titulo { get; set; }
            public string Descripcion { get; set; }
            public Guid ComunidadId { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Titulo).NotEmpty();
                RuleFor(x => x.Descripcion).NotEmpty();
                RuleFor(x => x.ComunidadId).NotEmpty();
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
                var nuevo = new Tema
                {
                    TemaId = guid,
                    Titulo = request.Titulo,
                    Descripcion = request.Descripcion,
                    FechaCreacion = DateTime.Now,
                    UsuarioCreadorId = usuario.Id,
                    ComunidadId = request.ComunidadId,
                    Activo = true
                };
                _context.Tema.Add(nuevo);

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al crear la comunidad");
            }
        }
    }
}
