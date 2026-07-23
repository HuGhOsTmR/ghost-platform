import {
  useState,
  useEffect
} from 'react'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

import AppLayout
  from '../layouts/AppLayout'

import SalesOrderLines
  from '../components/Sales/SalesOrderLines'

import GhostSearchSelect
  from '../components/Common/GhostSearchSelect'

import StatusBadge
  from '../components/Common/StatusBadge'

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
  useSalesOrder
} from '../hooks/useSalesOrder'

import {
  useUpdateSalesOrder
} from '../hooks/useUpdateSalesOrder'

export default function SalesOrderEditPage() {

  const { id } = useParams()

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useSalesOrder(
    id || ''
  )

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

  const updateOrder =
    useUpdateSalesOrder()

  const [header, setHeader] =
    useState({

      customer: 0,

      document_date: '',

      currency: 0,

      notes: ''

    })

  const [lines, setLines] =
    useState<any[]>([])

  useEffect(() => {

    if (!data)
      return

    setHeader({

      customer:
        data.customer,

      document_date:
        data.document_date,

      currency:
        data.currency,

      notes:
        data.notes || ''

    })

    setLines(

      data.lines.map(
        (line: any) => ({

          product:
            line.product,

          unit_of_measure:
            line.unit_of_measure,

          quantity:
            Number(
              line.quantity
            ),

          unit_price:
            Number(
              line.unit_price
            ),

          tax_percentage:
            Number(
              line.tax_percentage
            ),

          notes:
            line.notes || ''

        })
      )

    )

  }, [data])

  const subtotal =

    lines.reduce(

      (
        total,
        line
      ) =>

        total +

        (

          Number(
            line.quantity || 0
          )

          *

          Number(
            line.unit_price || 0
          )

        ),

      0

    )

  const taxAmount =

    lines.reduce(

      (
        total,
        line
      ) =>

        total +

        (

          Number(
            line.quantity || 0
          )

          *

          Number(
            line.unit_price || 0
          )

          *

          Number(
            line.tax_percentage || 0
          )

          / 100

        ),

      0

    )

  const totalAmount =
    subtotal +
    taxAmount

  const customerOptions =

    customers.map(
      (customer: any) => ({

        value: customer.id,

        label: customer.name

      })
    )

  const saveOrder =
    async () => {

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
          'Debe registrar al menos una línea'
        )

        return

      }

      const invalidLine =

        lines.find(

          line =>

            !line.product ||

            Number(
              line.quantity
            ) <= 0

        )

      if (invalidLine) {

        alert(
          'Existen líneas inválidas'
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

        await updateOrder
          .mutateAsync({

            id:
              Number(id),

            payload

          })

        alert(
          'Orden actualizada correctamente'
        )

        navigate(
          `/sales/orders/${id}`
        )

      }

      catch (error) {

        console.error(
          error
        )

        alert(
          'Error al actualizar la orden'
        )

      }

    }

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando orden...
        </div>

      </AppLayout>

    )

  }

  if (!data) {

    return (

      <AppLayout>

        <div>
          Orden no encontrada
        </div>

      </AppLayout>

    )

  }

  if (
    data.status !== 'DRAFT'
  ) {

    return (

      <AppLayout>

        <div
          className="
            bg-yellow-50
            border
            border-yellow-300
            rounded-lg
            p-6
          "
        >

          Esta orden ya fue aprobada
          y no puede ser editada.

        </div>

      </AppLayout>

    )

  }

  return (

    <AppLayout>

      <div
        className="
          space-y-6
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
              "
            >
              Editar Orden de Venta
            </h1>

            <p
              className="
                text-gray-500
                mt-1
              "
            >
              {data.document_number}
            </p>

          </div>

          <StatusBadge
            status={data.status}
          />

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

                options={
                  customerOptions
                }

                value={

                  customerOptions.find(

                    (option: any) =>

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

                value={
                  header.currency
                }

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
                    (
                      currency: any
                    ) => (

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

                value={
                  header.notes
                }

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
            bg-white
            rounded-xl
            border
            border-gray-200
            p-6
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              mb-4
            "
          >
            Totales
          </h2>

          <div
            className="
              flex
              flex-col
              items-end
              gap-2
            "
          >

            <div>

              Subtotal:

              <strong>
                {' '}
                Bs {subtotal.toFixed(2)}
              </strong>

            </div>

            <div>

              Impuestos:

              <strong>
                {' '}
                Bs {taxAmount.toFixed(2)}
              </strong>

            </div>

            <div
              className="
                text-xl
                font-bold
              "
            >

              Total:

              Bs {totalAmount.toFixed(2)}

            </div>

          </div>

        </div>

        <div
          className="
            bg-gray-50
            rounded-xl
            border
            border-gray-200
            p-6
          "
        >

          <h2
            className="
              font-semibold
              mb-3
            "
          >
            Auditoría
          </h2>

          <p>

            Creado:

            {' '}

            {new Date(
              data.created_at
            ).toLocaleString()}

          </p>

          <p>

            Última actualización:

            {' '}

            {new Date(
              data.updated_at
            ).toLocaleString()}

          </p>

        </div>

        <div
          className="
            flex
            justify-between
          "
        >

          <button

            onClick={() =>

              navigate(
                `/sales/orders/${id}`
              )

            }

            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-6
              py-3
              rounded-lg
            "
          >

            Volver

          </button>

          <button

            onClick={
              saveOrder
            }

            disabled={
              updateOrder.isPending
            }

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
              updateOrder.isPending

                ? 'Guardando...'

                : 'Guardar Cambios'
            }

          </button>

        </div>

      </div>

    </AppLayout>

  )

}