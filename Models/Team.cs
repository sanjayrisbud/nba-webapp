using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyNbaWebApp.Models
{
    public class Team
	{
		[Key]
		public string ObjectKey { get; set; }
		public string RobotName { get; set; }
		[Required]
		public DateTime FetchDate { get; set; }
		[Required]
		public string Id { get; set; }
		[Required]
		public string City { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string URL { get; set; }
		[Required]
		public string Logo { get; set; }
	}
}
