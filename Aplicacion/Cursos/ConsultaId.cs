using Aplicacion.ManejadorError;
using Aplicacion.Seguridad;
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

namespace Aplicacion.Cursos
{
    public class ConsultaId
    {
        public class CursoUnico : IRequest<CursoDTO>
        {
            public Guid Id { get; set; }
        }

        public class Manejador : IRequestHandler<CursoUnico, CursoDTO>
        {
            public readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CursoDTO> Handle(CursoUnico request, CancellationToken cancellationToken)
            {
                var curso = await _context.Curso
                    .Include(x => x.UsuarioCreador)
                    .Include(x => x.UsuariosSubscriptos).ThenInclude(x => x.Usuario)
                    .Include(x => x.ComentarioLista)
                    .FirstOrDefaultAsync(a => a.CursoId == request.Id);
                if (curso == null)
                {
                    throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se encontró el curso" });
                }

                var imagenPerfil = await _context.Documento.Where(x => x.ObjetoReferencia == curso.CursoId).FirstOrDefaultAsync();
                var cursoDTO = _mapper.Map<Curso, CursoDTO>(curso);
                if (imagenPerfil != null)
                {
                    var imagenCurso = new ImagenGeneral
                    {
                        Data = Convert.ToBase64String(imagenPerfil.Contenido),
                        Extension = imagenPerfil.Extension,
                        Nombre = imagenPerfil.Nombre
                    };
                    cursoDTO.ImagenCurso = imagenCurso;
                    return cursoDTO;
                }
                else
                {
                    return cursoDTO;
                }
                
            }
        }
    }
}
