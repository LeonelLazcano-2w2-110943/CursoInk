using Aplicacion.Compras;
using Aplicacion.Comunidades;
using Aplicacion.Cursos;
using Aplicacion.Temas;
using AutoMapper;
using Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Aplicacion
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Curso, CursoDTO>().
                ForMember(x => x.Instructores, y => y.MapFrom(z => z.UsuarioCreador))
                .ForMember(x => x.Usuarios, y => y.MapFrom(z => z.UsuariosSubscriptos.Select(a => a.Usuario).ToList()))
                .ForMember(x => x.Comentarios, y => y.MapFrom(z => z.ComentarioLista));
            CreateMap<Usuario, InstructorDTO>();
            CreateMap<CursoUsuario, CursoUsuarioDTO>();
            CreateMap<Comentario, ComentarioDTO>();
            CreateMap<Comunidad, ComunidadDTO>().
                ForMember(x => x.ListaTemas, y => y.MapFrom(z => z.ListaTemas))
                .ForMember(x => x.UsuarioCreador, y=>y.MapFrom(z=>z.UsuarioCreador));
            CreateMap<Tema, TemaDTO>().
                ForMember(x => x.ListaComentarios, y => y.MapFrom(z => z.ListaComentarios));
            CreateMap<Compra, CompraDTO>();
        }
    }
}
