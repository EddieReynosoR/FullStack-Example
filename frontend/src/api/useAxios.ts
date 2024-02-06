import axios from "axios"
import { BASE_URL } from "../const/const"
import { Order, Cliente } from '../types';

export const axi = axios.create({
    baseURL:BASE_URL,
})


export const getOrders = async ():Promise<Order[]> => {
    const response = await axi.get('/api/OrdenServicio')
    return response.data
}

export const postOrders = async (order: Order) => {
    await axi.post('api/OrdenServicio', order)
}

export const deleteOrder = async (id: number) => {
    await axi.delete(`api/OrdenServicio/${id}`)
}


export const getDatosCliente = async (id: number):Promise<Cliente> => {
    const response = await axi.get(`api/Cliente/${id}`)
    return response.data
}