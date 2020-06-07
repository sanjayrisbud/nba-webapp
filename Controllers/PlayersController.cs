using System;
using System.Collections.Generic;
using System.Linq;
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
    public class PlayersController : ControllerBase
    {
        private readonly MyNbaWebAppContext _context;
        private readonly IDataRepository<Player> _repo;

        public PlayersController(MyNbaWebAppContext context, IDataRepository<Player> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Players/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlayer([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var player = await _context.Player.FindAsync(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        // PUT: api/Players/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlayer([FromRoute] string id, [FromBody] Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != player.ObjectKey)
            {
                return BadRequest();
            }

            _context.Entry(player).State = EntityState.Modified;

            try
            {
                _repo.Update(player);
                var save = await _repo.SaveAsync(player);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Players
        [HttpPost]
        public async Task<IActionResult> PostPlayer([FromBody] Player player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(player);
            var save = await _repo.SaveAsync(player);

            return CreatedAtAction("GetPlayer", new { id = player.ObjectKey }, player);
        }

        // DELETE: api/Players/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var player = await _context.Player.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }

            _repo.Delete(player);
            var save = await _repo.SaveAsync(player);


            return Ok(player);
        }

        // GET: api/Players/team/5
        [HttpGet]
        [Route("team/{id?}")]
        public IEnumerable<Player> ListPlayers([FromRoute] string id)
        {
            IEnumerable<Player> players = new List<Player>();

            if (id != null && id != "undefined")
            {
                players = _context.Player.Where(e => e.Team == id);
                if (players.Count() != 0)
                {
                    players = players.OrderBy(p => p.Name);
                }
            }

            return players;
        }

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok("Hello");
        }

        private bool PlayerExists(string objectkey)
        {
            return _context.Player.Any(e => e.ObjectKey == objectkey);
        }
    }
}
