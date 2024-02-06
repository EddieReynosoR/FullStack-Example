using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackendEnASP.Models;
using System.Linq;
using System.Diagnostics.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace BackendEnASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenServicioController : ControllerBase
    {
        private readonly AssistASAP_BDContext _context;

        public OrdenServicioController(AssistASAP_BDContext db)
        {
            _context = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenServicioCliente>>> GetOrdenServicios()
        {
            if (_context.OrdenServicios == null)
            {
                return NotFound();
            }

            var ordenes = _context.OrdenServicios;
            var clientes = _context.Clientes;

            var query = (from order in ordenes
                         join client in clientes on order.Idcliente equals client.Idcliente
                         select new OrdenServicioCliente()
                         {
                             Idorden = order.Idorden,
                             Fecha = order.Fecha,
                             Descripcion = order.Descripcion,
                             Costo = order.Costo,
                             Idcliente = order.Idcliente,
                             ApellidoP = client.ApellidoP,
                             ApellidoM = client.ApellidoM,
                             Nombre = client.Nombre,
                             CorreoE = client.CorreoE
                         }).ToListAsync();

            return await query;
        }


        [HttpPost]
        public async Task<ActionResult<OrdenServicio>> PostOrdenServicio(OrdenServicio orden)
        {
            _context.OrdenServicios.Add(orden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrdenServicios), new { id = orden.Idorden }, orden);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdenServicio(int id)
        {
            var orden = await _context.OrdenServicios.FindAsync(id);

            if(orden == null) return NotFound();

            _context.OrdenServicios.Remove(orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
