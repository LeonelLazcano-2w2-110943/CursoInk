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

namespace Aplicacion.Comunidades
{
    public class ComunidadesPorUsuarios
    {
        public class Ejecuta : IRequest<List<ComunidadDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<ComunidadDTO>>
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
            public async Task<List<ComunidadDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var comunidades = await _context.Comunidad
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                if (comunidades == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado comunidades" });

                var comunidadesAlumno = comunidades.Where(x => x.UsuarioCreador.UserName == usuario).ToList();

                if (comunidadesAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Su usuario no posee comunidades aún" });

                var listaComunidades = new List<ComunidadDTO>();

                foreach (var comunidad in comunidadesAlumno)
                {
                    var comunidadDTO = _mapper.Map<Comunidad, ComunidadDTO>(comunidad);
                    listaComunidades.Add(comunidadDTO);
                }

                return listaComunidades;

                throw new Exception("Error al buscar comunidades");
            }
        }
    }
}
