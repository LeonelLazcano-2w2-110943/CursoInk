using Aplicacion.Contratos;
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

namespace Aplicacion.Cursos
{
    public class CursosPorUsuario
    {
        public class Ejecuta : IRequest<List<CursoDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<CursoDTO>>
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
            public async Task<List<CursoDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var cursos = await _context.Curso
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                if (cursos == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado cursos" });

                var cursosAlumno = cursos.Where(x => x.UsuarioCreador.UserName == usuario).ToList();

                if (cursosAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Su usuario no posee cursos aún" });

                var listaCursos = new List<CursoDTO>();

                foreach (var curso in cursosAlumno)
                {
                    var cursoDTO = _mapper.Map<Curso, CursoDTO>(curso);
                    listaCursos.Add(cursoDTO);
                }

                return listaCursos;

                throw new Exception("Error al buscar cursos");
            }
        }
    }
}
