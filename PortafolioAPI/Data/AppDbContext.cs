using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Models;

namespace PortafolioAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Project> Projects { get; set; }
        
        public DbSet<Skill> Skills { get; set; }

        public DbSet<ContactItem> ContactItems { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        // Configuración para apuntar al  esquema privado
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Esta línea obliga a Entity Framework a usar tu nuevo esquema "portafolio"
            modelBuilder.HasDefaultSchema("portafolio");
        }
    }
}