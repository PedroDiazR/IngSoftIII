using EmployeeCrudApi.Data;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using EmployeeCrudApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeCrudApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private ApplicationDbContext _context;
        private readonly List<string> inappropriateWords = new List<string> { "palabron", "palabrota" }; // Agrega aquí palabras inapropiadas

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Employee>> GetAll()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet]
        public async Task<Employee> GetById(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee employee)
        {
            //1. Verificar que el nombre no esté repetido
            if (await _context.Employees.AnyAsync(e => e.Name == employee.Name))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre del empleado ya existe." });
            }

            //2.  Validar que el nombre no contenga números
            if (Regex.IsMatch(employee.Name, @"\d"))
            {
                return BadRequest("El nombre no debe contener números.");
            }

            //3. Validar que el nombre no contenga caracteres especiales
            if (!Regex.IsMatch(employee.Name, @"^[a-zA-Z\s'áéíóúÁÉÍÓÚñÑ]+$"))
            {
                return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre contiene caracteres inválidos." });
            }

            //4. Filtro de palabras inapropiadas
            foreach (var word in inappropriateWords)
            {
                if (employee.Name.Contains(word, StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest(new { status = 400, error = "Bad Request", message = "El nombre contiene palabras inapropiadas." });
                }
            }

            //5. Verificar que el nombre no esté vacío o solo compuesto de espacios
            if (string.IsNullOrWhiteSpace(employee.Name))
            {
                return BadRequest("El nombre no puede estar vacío o compuesto solo de espacios.");
            }

            // Configurar la fecha de creación
            employee.CreatedDate = DateTime.Now;

            // Guardar el empleado en la base de datos
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpPut]
        public async Task Update([FromBody] Employee employee)
        {
            Employee employeeToUpdate = await _context.Employees.FindAsync(employee.Id);
            employeeToUpdate.Name = employee.Name;
            await _context.SaveChangesAsync();
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            var employeeToDelete = await _context.Employees.FindAsync(id);
            _context.Remove(employeeToDelete);
            await _context.SaveChangesAsync();
        }
    }
}
