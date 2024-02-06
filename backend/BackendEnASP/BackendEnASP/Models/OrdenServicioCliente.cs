namespace BackendEnASP.Models
{
    public class OrdenServicioCliente
    {
        public int Idorden { get; set; }
        public DateTime? Fecha { get; set; }
        public string? Descripcion { get; set; }
        public decimal? Costo { get; set; }
        public int? Idcliente { get; set; }
        public string? Nombre { get; set; }
        public string? ApellidoP { get; set; }
        public string? ApellidoM { get; set; }
        public string? CorreoE { get; set; }
    }
}
