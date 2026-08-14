namespace PortafolioAPI.Models
{
    public class Skill
    {
        public int Id { get; set; }
        
        // El nombre de la tecnología (Ej: "C#", "React", "PostgreSQL")
        public string Name { get; set; } = string.Empty; 
        
        // Aquí guardaremos el link de la imagen o el emoji del logo
        public string IconUrl { get; set; } = string.Empty; 
    }
}