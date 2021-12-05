using Aplicacion.Seguridad;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Aplicacion.Reportes
{
    public class GetReportes
    {
        public class Ejecuta : IRequest<Reportes>
        {
        }

        public class Manejador : IRequestHandler<Ejecuta, Reportes>
        {
            private readonly CursoInkContext _context;

            public Manejador(CursoInkContext context)
            {
                _context = context;
            }
            public async Task<Reportes> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var reporteGeneral = new Reportes();

                #region usuarios mas activos
                var listaUsuariosMasActivos = new List<UsuariosMasActivos>();
                var usuariosMasActivos = await _context.Usuario
                    .Include(x => x.ListaCursos)
                    .ThenInclude(x => x.Curso)
                    .Include(x => x.ListaCursoInstructor)
                    .Include(x => x.ListaComunidadUsuarios)
                    .Include(x => x.ListaTemas)
                    .ToListAsync();

                var usuariosTop = usuariosMasActivos.OrderByDescending(x => x.ListaCursoInstructor.Count())
                    .ThenByDescending(x => x.ListaComunidadUsuarios.Count())
                    .ThenByDescending(x => x.ListaTemas.Count()).ToList().Take(5);

                foreach (var usuario in usuariosTop)
                {
                    var imagenUsuarioMasActivo = await _context.Documento.Where(x => x.ObjetoReferencia == new Guid(usuario.Id)).FirstOrDefaultAsync();
                    if (imagenUsuarioMasActivo != null)
                    {
                        var imagenClienteActivo = new ImagenGeneral
                        {
                            Data = Convert.ToBase64String(imagenUsuarioMasActivo.Contenido),
                            Extension = imagenUsuarioMasActivo.Extension,
                            Nombre = imagenUsuarioMasActivo.Nombre
                        };

                        var reporteUsuariosMasActivos = new UsuariosMasActivos
                        {
                            UserName = usuario.UserName,
                            Descripcion = usuario.Biografia,
                            Imagen = null,
                            CantidadCursos = usuario.ListaCursoInstructor.Count(),
                            CantidadComunidades = usuario.ListaComunidadUsuarios.Count(),
                            CantidadTemas = usuario.ListaTemas.Count(),
                            ImagenUsuariosMasActivos = imagenClienteActivo
                        };

                        listaUsuariosMasActivos.Add(reporteUsuariosMasActivos);
                    }
                    else
                    {
                        var reporteUsuariosMasActivos = new UsuariosMasActivos
                        {
                            UserName = usuario.UserName,
                            Descripcion = usuario.Biografia,
                            Imagen = null,
                            CantidadCursos = usuario.ListaCursoInstructor.Count(),
                            CantidadComunidades = usuario.ListaComunidadUsuarios.Count(),
                            CantidadTemas = usuario.ListaTemas.Count(),
                            ImagenUsuariosMasActivos = null,
                        };

                        listaUsuariosMasActivos.Add(reporteUsuariosMasActivos);
                    }
                    
                }
                reporteGeneral.UsuariosMasActivos = listaUsuariosMasActivos;

                #endregion

                #region usuarios relevantes
                var listaUsuariosRelevantes = new List<UsuariosRelevantes>();
                var usuariosMasRelevantes = await _context.Usuario
                    .Include(x => x.ListaCursos)
                    .ThenInclude(x => x.Curso)
                    .Include(x => x.ListaCursoInstructor)
                    .ToListAsync();

                var usuariosRel = usuariosMasRelevantes.OrderByDescending(x => x.ListaCursoInstructor.Count())
                    .ThenByDescending(x => x.ListaCursos.Count()).ToList().Take(5);

                foreach (var usuario in usuariosRel)
                {
                    var imagenUsuarioRelevante = await _context.Documento.Where(x => x.ObjetoReferencia == new Guid(usuario.Id)).FirstOrDefaultAsync();
                    if (imagenUsuarioRelevante != null)
                    {
                        var imagenCliente = new ImagenGeneral
                        {
                            Data = Convert.ToBase64String(imagenUsuarioRelevante.Contenido),
                            Extension = imagenUsuarioRelevante.Extension,
                            Nombre = imagenUsuarioRelevante.Nombre
                        };

                        var reporteUsuariosRelevantes = new UsuariosRelevantes
                        {
                            UserName = usuario.UserName,
                            Descripcion = usuario.Biografia,
                            Imagen = null,
                            CantidadSuscriptos = usuario.ListaCursos.Count(),
                            CantidadCursos = usuario.ListaCursoInstructor.Count(),
                            ImagenUsuariosRelevantes = imagenCliente
                        };

                        listaUsuariosRelevantes.Add(reporteUsuariosRelevantes);
                    }
                    else
                    {
                        var reporteUsuariosRelevantes = new UsuariosRelevantes
                        {
                            UserName = usuario.UserName,
                            Descripcion = usuario.Biografia,
                            Imagen = null,
                            CantidadSuscriptos = usuario.ListaCursos.Count(),
                            CantidadCursos = usuario.ListaCursoInstructor.Count(),
                            ImagenUsuariosRelevantes = null
                        };

                        listaUsuariosRelevantes.Add(reporteUsuariosRelevantes);
                    }
                }
                reporteGeneral.UsuariosRelevantes = listaUsuariosRelevantes;

                #endregion

                #region cursos relevantes
                var listaCursosRelevantes = new List<CursosRelevantes>();
                var cursosMasRelevantes = await _context.Curso
                    .Include(x => x.UsuariosSubscriptos)
                    .Include(x => x.ComentarioLista)
                    .ToListAsync();

                var cursosRel = cursosMasRelevantes.OrderByDescending(x => x.UsuariosSubscriptos.Count())
                    .ThenByDescending(x => x.ComentarioLista.Count()).ToList().Take(5);

                foreach (var curso in cursosRel)
                {
                    var imagenCursoRelevante = await _context.Documento.Where(x => x.ObjetoReferencia == curso.CursoId).FirstOrDefaultAsync();
                    if (imagenCursoRelevante != null)
                    {
                        var imagenCurso = new ImagenGeneral
                        {
                            Data = Convert.ToBase64String(imagenCursoRelevante.Contenido),
                            Extension = imagenCursoRelevante.Extension,
                            Nombre = imagenCursoRelevante.Nombre
                        };

                        var reporteCursosRelevantes = new CursosRelevantes
                        {
                            Titulo = curso.Titulo,
                            Descripcion = curso.Descripcion,
                            Imagen = null,
                            CantidadComentarios = curso.ComentarioLista.Count(),
                            CantidadSuscriptores = curso.UsuariosSubscriptos.Count(),
                            ImagenCursosRelevantes = imagenCurso,
                            CursoId = curso.CursoId
                        };

                        listaCursosRelevantes.Add(reporteCursosRelevantes);
                    }
                    else
                    {
                        var reporteCursosRelevantes = new CursosRelevantes
                        {
                            Titulo = curso.Titulo,
                            Descripcion = curso.Descripcion,
                            Imagen = null,
                            CantidadComentarios = curso.ComentarioLista.Count(),
                            CantidadSuscriptores = curso.UsuariosSubscriptos.Count(),
                            ImagenCursosRelevantes = null,
                            CursoId = curso.CursoId
                        };

                        listaCursosRelevantes.Add(reporteCursosRelevantes);
                    }
                }
                reporteGeneral.CursosRelevantes = listaCursosRelevantes;

                #endregion

                #region comunidades relevantes
                var listaComunidadesRelevantes = new List<ComunidadesMasRelevantes>();
                var comunidadesMasRelevantes = await _context.Comunidad
                    .Include(x => x.ListaTemas)
                    .ToListAsync();

                var comunidadesRel = comunidadesMasRelevantes.OrderByDescending(x => x.ListaTemas.Count()).ToList().Take(5);

                foreach (var comunidad in comunidadesRel)
                {
                    var reporteComunidadesRelevantes = new ComunidadesMasRelevantes
                    {
                        Titulo = comunidad.Nombre,
                        Descripcion = comunidad.Descripcion,
                        CantidadTemas = comunidad.ListaTemas.Count(),
                        ComunidadId = comunidad.ComunidadId
                    };

                    listaComunidadesRelevantes.Add(reporteComunidadesRelevantes);
                }
                reporteGeneral.ComunidadesMasRelevantes = listaComunidadesRelevantes;

                #endregion

                var totalUsuarios = _context.Usuario.Count();
                var totalCursos = _context.Curso.Count();
                var totalComunidades = _context.Comunidad.Count();
                var totalTemas = _context.Tema.Count();

                var resumen = new ResumenGeneral
                {
                    CantidadUsuarios = totalUsuarios,
                    CantidadCursos = totalCursos,
                    CantidadComunidades = totalComunidades,
                    CantidadTemas = totalTemas
                };

                reporteGeneral.ResumenGeneral = resumen;

                return reporteGeneral;

                
            }
        }
    }
}
