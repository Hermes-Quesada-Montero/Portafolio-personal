using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserProfileController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Obtiene el perfil (y lo crea si no existe)
        [HttpGet]
        public async Task<ActionResult<UserProfile>> GetProfile()
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();
            if (profile == null)
            {
                profile = new UserProfile { Name = "Tu Nombre", Role = "Tu Puesto", Bio = "Tu biografía..." };
                _context.UserProfiles.Add(profile);
                await _context.SaveChangesAsync();
            }
            return Ok(profile);
        }

        // PUT: Actualiza el perfil
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfile updatedProfile)
        {
            var profile = await _context.UserProfiles.FirstOrDefaultAsync();
            if (profile == null) return NotFound();

            profile.Name = updatedProfile.Name;
            profile.Role = updatedProfile.Role;
            profile.Bio = updatedProfile.Bio;
            profile.CvBase64 = updatedProfile.CvBase64;
            profile.AvatarUrl = updatedProfile.AvatarUrl;

            await _context.SaveChangesAsync();
            return Ok(profile);
        }
    }
}