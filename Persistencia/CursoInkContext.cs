using Dominio;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistencia
{
    public class CursoInkContext : IdentityDbContext<Usuario>
    {
        public CursoInkContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CursoUsuario>().HasKey(cu => new { cu.UsuarioId, cu.CursoId });
        }

        public DbSet<Curso> Curso { get; set; }
        public DbSet<Comentario> Comentario { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<CursoUsuario> CursoUsuario { get; set; }
        public DbSet<Tema> Tema { get; set; }
        public DbSet<Comunidad> Comunidad { get; set; }
        public DbSet<Documento> Documento { get; set; }
    }
}
