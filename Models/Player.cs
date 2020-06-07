using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyNbaWebApp.Models
{
    public class Player
	{
		[Key]
		public string ObjectKey { get; set; }
		public string RobotName { get; set; }
		[Required]
		public DateTime FetchDate { get; set; }
		[Required]
		public string Team { get; set; }
		
		public int? Jersey { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Position { get; set; }
		
		public string Height { get; set; }
		
		public string Weight { get; set; }
	
		public string URL { get; set; }
		[Required]
		public string Headshot { get; set; }
	}
}
