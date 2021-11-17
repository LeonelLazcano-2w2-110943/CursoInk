using AutoMapper;
using Dominio;
using JW;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using Persistencia.Paginacion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Cursos
{
    public class Consulta
    {
        public class ListaCursos : IRequest<PaginacionModel>
        {
            public int CurrentPage { get; set; }
            public int PageSize { get; set; }
            public string FiltroTitulo { get; set; }
            public string FiltroDescripcion { get; set; }
        }
        public class Manejador : IRequestHandler<ListaCursos, PaginacionModel>
        {
            private readonly CursoInkContext _context;
            private readonly IMapper _mapper;
            public Manejador(CursoInkContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PaginacionModel> Handle(ListaCursos request, CancellationToken cancellationToken)
            {
                var cursoCounter = _context.Curso.Count();
                var cursos = await _context.Curso
                    .Include(x => x.UsuarioCreador)
                    .ToListAsync();

                var cursoFiltro = cursos.Where(x => (x.Titulo).Contains(request.FiltroTitulo) ||
                (x.Descripcion).Contains(request.FiltroTitulo)).ToList();

                var paginacion = new PaginacionModel(cursoFiltro.Count(), request.CurrentPage, request.PageSize);
                var result = cursos
                    .Skip(paginacion.pager.StartIndex).Take(request.PageSize)
                    .Where(x => (x.Titulo).Contains(request.FiltroTitulo) || (x.Descripcion).Contains(request.FiltroTitulo))
                    .OrderBy(x => x.Titulo)
                    .ToList();

                var listaCurso = new List<CursoDTO>();
                foreach (var curso in result)
                {
                    var mapper = _mapper.Map<Curso, CursoDTO>(curso);
                    listaCurso.Add(mapper);
                }

                paginacion.ListaRecordsCurso = listaCurso;

                return paginacion;
            }
        }
    }
}
