namespace PortafolioAPI.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string CvBase64 { get; set; } = string.Empty; 
        public string AvatarUrl { get; set; } = string.Empty; 
    }
}