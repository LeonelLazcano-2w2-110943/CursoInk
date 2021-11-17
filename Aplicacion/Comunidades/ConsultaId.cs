using Aplicacion.ManejadorError;
using AutoMapper;
using Dominio;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static Aplicacion.Cursos.ConsultaId;

namespace Aplicacion.Comunidades
{
    public class ConsultaId
    {
        public class Ejecuta : IRequest<ComunidadDTO>
        {
            public Guid Id { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta, ComunidadDTO>
        {
            public readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ComunidadDTO> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var comunidad = await _context.Comunidad
                    .Include(x => x.UsuarioCreador)
                    .Include(x => x.ListaTemas).ThenInclude(y => y.UsuarioCreador)
                    .FirstOrDefaultAsync(a => a.ComunidadId == request.Id);
                if (comunidad == null)
                {
                    throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró la comunidad" });
                }

                var comunidadDTO = _mapper.Map<Comunidad, ComunidadDTO>(comunidad);
                return comunidadDTO;
            }
        }
    }
}
