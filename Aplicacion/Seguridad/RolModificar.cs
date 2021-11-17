using Aplicacion.ManejadorError;
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

namespace Aplicacion.Seguridad
{
    public class RolModificar
    {
        public class Ejecuta : IRequest
        {
            public string Id { get; set; }
            public string Name { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            private readonly RoleManager<IdentityRole> _roleManager;
            public Manejador(CursoInkContext context, RoleManager<IdentityRole> roleManager)
            {
                _context = context;
                _roleManager = roleManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var rol = await _roleManager.FindByIdAsync(request.Id);
                if (rol == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el rol" });

                rol.Name = request.Name;

                var resultado = await _context.SaveChangesAsync();
                if (resultado > 0) return Unit.Value;

                throw new Exception("Error al modificar el rol");
            }
        }
    }
}
