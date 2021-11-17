using AutoMapper;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Comunidades
{
    public class Lista
    {
        public class Ejecuta : IRequest<List<ComunidadDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<ComunidadDTO>>
        {
            private readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<List<ComunidadDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var comunidad = await _context.Comunidad
                    .Include(x => x.ListaTemas)
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                var ComunidadDTO = _mapper.Map<List<Comunidad>, List<ComunidadDTO>>(comunidad);

                return ComunidadDTO;
            }
        }
    }
}
