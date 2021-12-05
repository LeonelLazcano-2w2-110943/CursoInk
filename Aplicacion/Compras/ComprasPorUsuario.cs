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

namespace Aplicacion.Compras
{
    public class ComprasPorUsuario
    {
        public class Ejecuta : IRequest<List<CompraDTO>> { }

        public class Manejador : IRequestHandler<Ejecuta, List<CompraDTO>>
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
            public async Task<List<CompraDTO>> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = _usuarioSesion.ObtenerUsuarioSesion();
                var compras = await _context.Compra.ToListAsync();

                if (compras == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "No se han encontrado compras" });

                var comprasAlumno = compras.Where(x => x.UserName == usuario).ToList();

                if (comprasAlumno == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "Su usuario no posee compras aún" });

                var listaCompras = new List<CompraDTO>();

                foreach (var compra in comprasAlumno)
                {
                    var compraDTO = _mapper.Map<Compra, CompraDTO>(compra);
                    listaCompras.Add(compraDTO);
                }

                return listaCompras;

                throw new Exception("Error al buscar compras");
            }
        }
    }
}
