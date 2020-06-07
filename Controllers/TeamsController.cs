using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNbaWebApp.Data;
using MyNbaWebApp.Models;

namespace MyNbaWebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly MyNbaWebAppContext _context;
        private readonly IDataRepository<Team> _repo;

        public TeamsController(MyNbaWebAppContext context, IDataRepository<Team> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Teams
        [HttpGet]
        public IEnumerable<Team> getTeams()
        {
            return _context.Team.OrderBy(p => p.City);
        }

        // GET: api/Teams/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeamByTeamId([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var team = await _context.Team.Where(e => e.Id == id).FirstAsync();

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }


        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }

        private bool TeamExists(string objectkey)
        {
            return _context.Team.Any(e => e.ObjectKey == objectkey);
        }

     }
}
