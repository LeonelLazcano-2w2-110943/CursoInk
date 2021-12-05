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

namespace Aplicacion.Temas
{
    public class TemasPorUsuario
    {
        public class Ejecuta : IRequest<List<TemaDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<TemaDTO>>
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
            public async Task<List<TemaDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var temas = await _context.Tema
                    .Include(x => x.Comunidad)
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                if (temas == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado temas" });

                var temasAlumno = temas.Where(x => x.UsuarioCreador.UserName == usuario).ToList();

                if (temasAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Su usuario no posee temas aún" });

                var listaTemas = new List<TemaDTO>();

                foreach (var tema in temasAlumno)
                {
                    var temaDTO = _mapper.Map<Tema, TemaDTO>(tema);
                    listaTemas.Add(temaDTO);
                }

                return listaTemas;

                throw new Exception("Error al buscar temas");
            }
        }
    }
}
