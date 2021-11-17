using Aplicacion.ManejadorError;
using Dominio;
using FluentValidation;
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

namespace Aplicacion.Cursos
{
    public class Subscripcion
    {
        public class Ejecuta : IRequest
        {
            public string UsuarioId { get; set; }
            public Guid CursoId { get; set; }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly CursoInkContext _context;
            private readonly UserManager<Usuario> _userManager;
            public Manejador(CursoInkContext context, UserManager<Usuario> userManager)
            {
                _context = context;
                _userManager = userManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var usuario = await _userManager.FindByIdAsync(request.UsuarioId);
                if (usuario == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "El usuario no existe"});

                var curso = await _context.Curso.FindAsync(request.CursoId);
                if (curso == null) throw new ManejadorException(HttpStatusCode.BadRequest, new { mensaje = "El curso no existe" });

                var yaSuscrito = false;
                var usuarioSuscrito = new CursoUsuario();

                var listaCursos = await _context.Curso.Include(x => x.UsuariosSubscriptos).
                    ThenInclude(y => y.Usuario)
                    .Where(x => x.CursoId == request.CursoId)
                    .ToListAsync();
                foreach (var cursito in listaCursos)
                {
                    foreach (var item in cursito.UsuariosSubscriptos)
                    {
                        if (item.CursoId == request.CursoId && item.UsuarioId == request.UsuarioId)
                        {
                            usuarioSuscrito = item;
                            yaSuscrito = true;
                        } 
                    }
                }

                if (!yaSuscrito)
                {
                    var cursoUsuario = new CursoUsuario
                    {
                        CursoId = request.CursoId,
                        UsuarioId = request.UsuarioId
                    };

                    _context.CursoUsuario.Add(cursoUsuario);

                    var resultado = await _context.SaveChangesAsync();
                    if (resultado > 0) return Unit.Value;
                }
                else
                {
                    _context.Remove(usuarioSuscrito);
                    var resultado = await _context.SaveChangesAsync();
                    if (resultado > 0) return Unit.Value;
                }

                throw new Exception("Error al intentar la operación");
            }
        }
    }
}
