import { useState } from 'react'

import AppLayout
  from '../layouts/AppLayout'

import SalesOrderLines
  from '../components/Sales/SalesOrderLines'

import {
  useCustomers
} from '../hooks/useCustomers'

import {
  useProducts
} from '../hooks/useProducts'

import {
  useUnits
} from '../hooks/useUnits'

import {
  useCurrencies
} from '../hooks/useCurrencies'

import {
  useNavigate
} from 'react-router-dom'

import {
  useCreateSalesOrder
} from '../hooks/useCreateSalesOrder'

import GhostSearchSelect
  from '../components/Common/GhostSearchSelect'

export default function SalesOrderCreatePage() {

  const [header, setHeader] = useState({

    customer: 0,

    document_date:
      new Date()
        .toISOString()
        .split('T')[0],

    currency: 0,

    notes: ''

  })

  const [lines, setLines] = useState([

    {

      product: 0,

      unit_of_measure: 0,

      quantity: 1,

      unit_price: 0,

      tax_percentage: 0,

      notes: ''

    }

  ])

  const {
    data: customers = []
  } = useCustomers()

  const {
    data: products = []
  } = useProducts()

  const {
    data: units = []
  } = useUnits()

  const {
    data: currencies = []
  } = useCurrencies()

  const navigate =
    useNavigate()

  const createOrder =
    useCreateSalesOrder()

  const customerOptions =

    customers.map(
      customer => ({

        value: customer.id,

        label: customer.name

      })
    )

  const saveOrder = async () => {

    if (!header.customer) {

      alert(
        'Seleccione un cliente'
      )

      return

    }

    if (!header.currency) {

      alert(
        'Seleccione una moneda'
      )

      return

    }

    if (!lines.length) {

      alert(
        'Agregue al menos una línea'
      )

      return

    }

    const payload = {

      customer:
        header.customer,

      currency:
        header.currency,

      document_date:
        header.document_date,

      notes:
        header.notes,

      lines

    }

    try {

      const order =

        await createOrder.mutateAsync(
          payload
        )

      alert(
        'Orden creada correctamente'
      )

      navigate(
        `/sales/orders/${order.id}`
      )

    }

    catch (error) {

      console.error(
        error
      )

      alert(
        'Error al guardar la orden'
      )

    }

  }

  return (

    <AppLayout>

      <div
        className="
          space-y-6
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Nueva Orden de Venta
          </h1>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Registro de orden comercial
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              mb-4
            "
          >
            Información General
          </h2>

          <div
            className="
              grid
              grid-cols-2
              gap-6
            "
          >

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Cliente
              </label>

              <GhostSearchSelect

                options={customerOptions}

                value={

                  customerOptions.find(

                    option =>

                      option.value ===
                      header.customer

                  ) || null

                }

                placeholder="Buscar cliente..."

                onChange={(selected) =>

                  setHeader({

                    ...header,

                    customer:
                      selected?.value || 0

                  })

                }

              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Fecha
              </label>

              <input

                type="date"

                value={
                  header.document_date
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    document_date:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Moneda
              </label>

              <select

                value={header.currency}

                onChange={(e) =>

                  setHeader({

                    ...header,

                    currency:
                      Number(
                        e.target.value
                      )

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              >

                <option value={0}>
                  Seleccione...
                </option>

                {
                  currencies.map(
                    currency => (

                      <option
                        key={currency.id}
                        value={currency.id}
                      >

                        {currency.code}
                        {' - '}
                        {currency.name}

                      </option>

                    )
                  )
                }

              </select>

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Notas
              </label>

              <input

                value={header.notes}

                onChange={(e) =>

                  setHeader({

                    ...header,

                    notes:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            </div>

          </div>

        </div>

        <SalesOrderLines

          lines={lines}

          setLines={setLines}

          products={products}

          units={units}

        />

        <div
          className="
            flex
            justify-end
          "
        >

          <button
            onClick={saveOrder}
            disabled={createOrder.isPending}
            className="
              bg-red-600
              hover:bg-red-700
              disabled:bg-gray-400
              text-white
              px-6
              py-3
              rounded-lg
              font-medium
            "
          >
            {
              createOrder.isPending
                ? 'Guardando...'
                : 'Guardar Orden'
            }
          </button>

        </div>

      </div>

    </AppLayout>

  )

}