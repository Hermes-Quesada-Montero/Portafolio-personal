using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortafolioAPI.Data;
using PortafolioAPI.Models;

namespace PortafolioAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Leer todas las tarjetas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactItem>>> GetContactItems()
        {
            // MAGIA 1: Le decimos a la base de datos que ordene la lista por OrderIndex antes de enviarla
            return await _context.ContactItems
                                 .OrderBy(c => c.OrderIndex) 
                                 .ToListAsync();
        }

        // POST: Crear una nueva tarjeta
        [HttpPost]
        public async Task<ActionResult<ContactItem>> CreateContactItem([FromBody] ContactItem item)
        {
            _context.ContactItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // PUT: Actualizar una tarjeta existente (¡y su orden!)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContactItem(int id, [FromBody] ContactItem updatedItem)
        {
            var item = await _context.ContactItems.FindAsync(id);
            if (item == null)
            {
                return NotFound("El elemento no existe.");
            }

            item.Title = updatedItem.Title;
            item.Value = updatedItem.Value;
            item.MainIcon = updatedItem.MainIcon;
            item.RedirectUrl = updatedItem.RedirectUrl;
            item.RedirectIcon = updatedItem.RedirectIcon;
            item.ShowCopyButton = updatedItem.ShowCopyButton;
            
            // MAGIA 2: Guardamos en la base de datos la nueva posición
            item.OrderIndex = updatedItem.OrderIndex;

            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // DELETE: Borrar una tarjeta
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactItem(int id)
        {
            var item = await _context.ContactItems.FindAsync(id);
            if (item == null)
            {
                return NotFound("El elemento no existe.");
            }

            _context.ContactItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Elemento eliminado correctamente" });
        }
    }
}