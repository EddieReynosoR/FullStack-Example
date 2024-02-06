import { FormEvent, useState } from "react"
import {Button, Card, TextInput, Title, NumberInput} from "@tremor/react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { getDatosCliente, postOrders } from "../api/useAxios"
import { toast } from "sonner"
import { Order } from "../types"

export const Form = () => {

    const [clientID, setClientID] = useState(1)

    const queryClient = useQueryClient()

    const {data} = useQuery({
        queryKey: ["cliete", clientID],
        queryFn: () => getDatosCliente(clientID),
    })

    

    const addOrderMutation = useMutation({
        mutationFn: postOrders,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['orders']})
            toast.success('Orden añadida')
        },
        onError: () => {
            toast.error('Hubo un error')
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        const form = event.target as HTMLFormElement

        const formData = new FormData(form)

        const IDOrden = formData.get("ID") as string
        const Fecha = new Date(formData.get("fecha") as string)
        const Descripcion = formData.get("descripcion") as string
        const Costo = formData.get("costo") as string
        const IDCliente = formData.get("IDCliente") as string

        setClientID(Number(IDCliente))

        const order:Order = {
            idorden: Number(IDOrden),
            fecha: Fecha,
            descripcion: Descripcion,
            costo: Number(Costo),
            idcliente: Number(IDCliente),
            apellidoP: data?.apellidoP,
            apellidoM: data?.apellidoM,
            nombre: data?.nombre,
            correoE: data?.correoE,
        }

        addOrderMutation.mutate(order)

        form.reset()
    }
    return (
        <Card style={{marginTop: '16px'}}>
            <Title>Añade una nueva Orden de Servicio</Title>
            <form onSubmit={handleSubmit}>
                <NumberInput style={{marginBottom: "10px"}} placeholder="Inserta un ID" name="ID"/>
                <div className="relative max-w-sm" style={{marginBottom: "10px"}}>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                </div>
                <TextInput  style={{marginBottom: "10px"}} name="descripcion" placeholder="Pon una descripcion" />
                <NumberInput  style={{marginBottom: "10px"}} placeholder="Inserta un costo" name="costo"/>
                <NumberInput  style={{marginBottom: "10px"}} placeholder="Inserta de un cliente" name="IDCliente"/>

                <div>
                    <Button type="submit" style={{marginTop:"16px"}}>
                        Insertar Orden
                    </Button>
                </div>
            </form>
        </Card> 
    )
}