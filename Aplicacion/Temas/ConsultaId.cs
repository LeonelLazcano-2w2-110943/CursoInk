using Aplicacion.ManejadorError;
using AutoMapper;
using Dominio;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Temas
{
    public class ConsultaId
    {
        public class Ejecuta : IRequest<TemaDTO>
        {
            public Guid TemaId { get; set; }
        }

        public class EjecutaValidacion : AbstractValidator<Ejecuta>
        {
            public EjecutaValidacion()
            {
                RuleFor(x => x.TemaId).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, TemaDTO>
        {
            private readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<TemaDTO> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var tema = await _context.Tema
                    .Include(x => x.Comunidad)
                    .Include(x => x.UsuarioCreador)
                    .Include(x => x.ListaComentarios)
                    .FirstOrDefaultAsync(a => a.TemaId == request.TemaId);
                if (tema == null)
                {
                    throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el tema" });
                }

                var temaDTO = _mapper.Map<Tema, TemaDTO>(tema);
                return temaDTO;
            }
        }
    }
}
