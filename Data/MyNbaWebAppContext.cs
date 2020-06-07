using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyNbaWebApp.Models;

namespace MyNbaWebApp.Data
{
    public class MyNbaWebAppContext : DbContext
    {
        public MyNbaWebAppContext (DbContextOptions<MyNbaWebAppContext> options)
            : base(options)
        {
        }

        public DbSet<MyNbaWebApp.Models.Team> Team { get; set; }

        public DbSet<MyNbaWebApp.Models.Player> Player { get; set; }
    }
}
