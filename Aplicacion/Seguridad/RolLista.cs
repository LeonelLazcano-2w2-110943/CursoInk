using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Seguridad
{
    public class RolLista
    {
        public class Ejecuta : IRequest<List<IdentityRole>>
        {
        }

        public class Manejador : IRequestHandler<Ejecuta, List<IdentityRole>>
        {
            private readonly CursoInkContext _context;
            public Manejador(CursoInkContext context)
            {
                _context = context;
            }

            public async Task<List<IdentityRole>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var roles = await _context.Roles.ToListAsync();
                return roles;
            }
        }
    }
}
