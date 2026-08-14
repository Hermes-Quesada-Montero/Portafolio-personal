using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Leer todas las skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        // POST: Crear una nueva skill
        [HttpPost]
        public async Task<ActionResult<Skill>> CreateSkill([FromBody] Skill skill)
        {
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
            return Ok(skill);
        }

        // PUT: Actualizar una skill existente
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSkill(int id, [FromBody] Skill updatedSkill)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound("La habilidad no existe.");
            }

            skill.Name = updatedSkill.Name;
            skill.IconUrl = updatedSkill.IconUrl;

            await _context.SaveChangesAsync();
            return Ok(skill);
        }

        // DELETE: Borrar una skill
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound("La habilidad no existe.");
            }

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Habilidad eliminada correctamente" });
        }
    }
}