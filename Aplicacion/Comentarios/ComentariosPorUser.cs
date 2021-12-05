using Aplicacion.Contratos;
using Aplicacion.Cursos;
using Aplicacion.ManejadorError;
using AutoMapper;
using Dominio;
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

namespace Aplicacion.Comentarios
{
    public class ComentariosPorUser
    {
        public class Ejecuta : IRequest<List<ComentarioDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<ComentarioDTO>>
        {
            private readonly CursoInkContext _context;
            private readonly IUsuarioSesion _usuarioSesion;
            private readonly IMapper _mapper;

            public Manejador(CursoInkContext context, IUsuarioSesion usuarioSesion, IMapper mapper)
            {
                _context = context;
                _usuarioSesion = usuarioSesion;
                _mapper = mapper;
            }
            public async Task<List<ComentarioDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var comentarios = await _context.Comentario
                    .Include(x => x.Curso)
                    .Include(x => x.Tema)
                    .ToListAsync();

                if(comentarios == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado comentarios" });

                var comentariosAlumno = comentarios.Where(x => x.Alumno == usuario).ToList();

                if (comentariosAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Su usuario no posee comentarios aún" });

                var listaComentarios = new List<ComentarioDTO>();

                foreach (var coment in comentariosAlumno)
                {
                    var comentarioDTO = _mapper.Map<Comentario, ComentarioDTO>(coment);
                    listaComentarios.Add(comentarioDTO);
                }

                return listaComentarios;

                throw new Exception("Error al buscar comentarios");
            }
        }
    }
}
