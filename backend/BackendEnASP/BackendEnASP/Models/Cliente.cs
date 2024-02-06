using System;
using System.Collections.Generic;

namespace BackendEnASP.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            OrdenServicios = new HashSet<OrdenServicio>();
        }

        public int Idcliente { get; set; }
        public string? Nombre { get; set; }
        public string? ApellidoP { get; set; }
        public string? ApellidoM { get; set; }
        public string? CorreoE { get; set; }

        public virtual ICollection<OrdenServicio> OrdenServicios { get; set; }
    }
}
