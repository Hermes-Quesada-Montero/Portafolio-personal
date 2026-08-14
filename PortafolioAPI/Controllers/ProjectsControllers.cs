using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/projects
        // Obtiene todos los proyectos guardados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            return await _context.Projects.ToListAsync();
        }

        // POST: api/projects
        // Guarda un proyecto nuevo en Supabase
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            // Devuelve el proyecto recién creado
            return CreatedAtAction(nameof(GetProjects), new { id = project.Id }, project);
        }

        // ==========================================
        // PUERTA PARA ACTUALIZAR (PUT)
        // ==========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] Project updatedProject)
        {
            // 1. Buscamos si el proyecto existe en la base de datos
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("El proyecto no existe.");
            }

            // 2. Actualizamos los datos con lo que mandó React
            project.Title = updatedProject.Title;
            project.Description = updatedProject.Description;
            project.ImageUrl = updatedProject.ImageUrl;
            project.ProjectUrl = updatedProject.ProjectUrl;
            project.Technologies = updatedProject.Technologies;

            // 3. Guardamos los cambios
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        // ==========================================
        // PUERTA PARA BORRAR (DELETE)
        // ==========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound("El proyecto no existe.");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Proyecto eliminado correctamente" });
        }
    }
}