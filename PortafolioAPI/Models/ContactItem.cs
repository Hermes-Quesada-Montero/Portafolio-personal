namespace PortafolioAPI.Models
{
    public class ContactItem
    {
        public int Id { get; set; }
        
        // Ej: "Email", "LinkedIn", "Phone"
        public string Title { get; set; } = string.Empty; 
        
        // Ej: "hjosueqm0507@gmail.com" o "+506 8488 8900"
        public string Value { get; set; } = string.Empty; 
        
        // El icono de la izquierda (puede ser un emoji 📍 o un link de un SVG)
        public string MainIcon { get; set; } = string.Empty; 
        
        // --- CONFIGURACIÓN DE LOS BOTONES DE LA DERECHA ---
        
        // El link a donde te lleva. Si lo dejas vacío, el botón no aparece.
        public string RedirectUrl { get; set; } = string.Empty; 
        
        // El icono del botón de ir. Ej: "↗️" o el globito de chat "💬"
        public string RedirectIcon { get; set; } = string.Empty; 
        
        // ¿Mostrar el botón de las hojitas para copiar el texto? (true/false)
        public bool ShowCopyButton { get; set; } = true; 

        public int OrderIndex { get; set; } = 0;
    }
}