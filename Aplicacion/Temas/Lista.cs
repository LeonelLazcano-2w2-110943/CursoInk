using AutoMapper;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
    public class Lista
    {
        public class Ejecuta : IRequest<List<TemaDTO>>
        {
        }

        public class Manejador : IRequestHandler<Ejecuta, List<TemaDTO>>
        {
            private readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<TemaDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var temas = await _context.Tema
                    .Include(x => x.Comunidad)
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                temas = temas.OrderBy(x => x.FechaCreacion).ToList();

                var lista = _mapper.Map<List<Tema>, List<TemaDTO>>(temas);

                return lista;
            }
        }
    }
}
