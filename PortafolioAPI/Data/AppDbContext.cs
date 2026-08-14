using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Models;

namespace PortafolioAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // La tabla de proyectos que ya tenías
        public DbSet<Project> Projects { get; set; }
        
        // NUEVA: La tabla para tus habilidades
        public DbSet<Skill> Skills { get; set; }

        public DbSet<ContactItem> ContactItems { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }
    }
}