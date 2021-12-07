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

namespace Aplicacion.Compras
{
    public class CursosAdquiridos
    {
        public class Ejecuta : IRequest<List<CursoDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<CursoDTO>>
        {
            private readonly CursoInkContext _context;
            private readonly IUsuarioSesion _usuarioSesion;
            private readonly IMapper _mapper;
            private readonly UserManager<Usuario> _userManager;
            public Manejador(CursoInkContext context, IUsuarioSesion usuarioSesion, IMapper mapper, UserManager<Usuario> userManager)
            {
                _context = context;
                _usuarioSesion = usuarioSesion;
                _mapper = mapper;
                _userManager = userManager;
            }
            public async Task<List<CursoDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var fullUsuario = await _userManager.FindByNameAsync(usuario);
                var cursos = await _context.Curso
                    .Include(x => x.UsuariosSubscriptos).ThenInclude(x => x.Usuario)
                    .ToListAsync();

                if (cursos == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado cursos" });

                var cursosAlumno = cursos.Where(x => x.UsuariosSubscriptos.Select(y => y.UsuarioId == fullUsuario.Id).FirstOrDefault()).ToList();

                if (cursosAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No has comprado cursos aún" });

                var listaCursosComprados = new List<CursoDTO>();

                foreach (var curso in cursosAlumno)
                {
                    var cursoDTO = _mapper.Map<Curso, CursoDTO>(curso);
                    listaCursosComprados.Add(cursoDTO);
                }

                return listaCursosComprados;

                throw new Exception("Error al buscar los cursos");
            }
        }
    }
}
