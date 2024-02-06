export interface Order {
    idorden: number
    fecha: Date
    descripcion: string
    costo: number
    idcliente: number
    nombre: string | undefined
    apellidoP: string | undefined
    apellidoM: string | undefined
    correoE: string | undefined
}

export interface Cliente{
    idcliente: number
    nombre: string
    apellidoP: string
    apellidoM: string
    correoE: string
}