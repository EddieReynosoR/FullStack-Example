import {getOrders, deleteOrder} from '../api/useAxios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    Title,
    Badge, 
    Text
  } from "@tremor/react";

import { toast } from 'sonner';

import { CircularProgress } from '@mui/material';

export const TablaOrdenes = () => {
    
    const {data, isError, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    })

    const queryClient = useQueryClient()

    const deleteOrderMutation = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['orders']})
            toast.success('Orden eliminada')
        },
        onError: () => {
            toast.error('Hubo un error')
        }
    })

    const removeOrder = (id: number) => {
        deleteOrderMutation.mutate(id)
    }


    return (
        <>
            { isError && toast.error('¡Ha ocurrido un error!')}    
            <Card>
                <h1 className='text-black'>
                    Ordenes de servicio
                    {
                        !isLoading && !isError &&
                        <Badge>
                            {data?.length}
                        </Badge>
                    }
                </h1>
                {
                    isLoading ? 
                    <div className='w-full flex justify-center mt-10 mb-10'>
                        <CircularProgress/>
                    </div>
                    :
                    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell >Fecha</TableHeaderCell>
                                <TableHeaderCell >Descripción</TableHeaderCell>
                                <TableHeaderCell >Costo</TableHeaderCell>
                                <TableHeaderCell >IDCliente</TableHeaderCell>
                                <TableHeaderCell >Apellidos</TableHeaderCell>
                                <TableHeaderCell >Nombre</TableHeaderCell>
                                <TableHeaderCell >Correo</TableHeaderCell>
                                <TableHeaderCell >Eliminar</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {data?.map((order)=> (
                            <TableRow key={order.idorden}>
                                <TableCell>
                                    <Text>{order.idorden}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.fecha.toString()}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.descripcion}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.costo}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.idcliente}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.apellidoP}  {order.apellidoM}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.nombre}</Text>
                                </TableCell>
                                <TableCell>
                                    <Text>{order.correoE}</Text>
                                </TableCell>
                                <TableCell>
                                <button type='button' onClick={() => removeOrder(order.idorden)}>
                                    <svg
                                        aria-label='Remove element'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                        />
                                    </svg>
                                </button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    
                    </Table>
                }
                
            </Card>
            
        </>
    )
}