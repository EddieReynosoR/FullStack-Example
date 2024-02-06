using System;
using System.Collections.Generic;

namespace BackendEnASP.Models
{
    public partial class OrdenServicio
    {
        public int Idorden { get; set; }
        public DateTime? Fecha { get; set; }
        public string? Descripcion { get; set; }
        public decimal? Costo { get; set; }
        public int? Idcliente { get; set; }

        public virtual Cliente? IdclienteNavigation { get; set; }
    }
}
