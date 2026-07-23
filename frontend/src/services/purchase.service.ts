import { api } from './api'

import type {
    PurchaseReceiptCreate
} from "../types";

export const getPurchaseOrders =
  async () => {

    const response =
      await api.get(
        '/purchases/orders/'
      )

    return response.data

  }

export const getPurchaseOrder =
  async (
    id: string
  ) => {

    const response =
      await api.get(
        `/purchases/orders/${id}/`
      )

    return response.data

  }

export const createPurchaseOrder =
  async (
    payload: any
  ) => {

    const response =
      await api.post(
        '/purchases/orders/',
        payload
      )

    return response.data

  }

  export const createPurchaseReceipt = async (

      payload: PurchaseReceiptCreate

  ) => {

      const response = await api.post(

          "/purchases/receipts/",

          payload

      );

      return response.data;

  };

  export const getPurchaseReceipt = async (

      id: number | string

  ) => {

      const response = await api.get(

          `/purchases/receipts/${id}/`

      );

      return response.data;

  };