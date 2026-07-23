import AppLayout
  from '../layouts/AppLayout'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import {
  useSalesOrder
} from '../hooks/useSalesOrder'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useApproveSalesOrder
} from '../hooks/useApproveSalesOrder'

import {
  useReopenSalesOrder
} from '../hooks/useReopenSalesOrder'

import {
  useCreateSalesInvoice
} from '../hooks/useCreateSalesInvoice'

export default function SalesOrderDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading
  } = useSalesOrder(
    id || ''
  )

  const approveOrder =
    useApproveSalesOrder()

  const reopenOrder =
    useReopenSalesOrder()

  const navigate =
    useNavigate()

  const createInvoice =
    useCreateSalesInvoice()

  const handleApprove =
    async () => {

      if (!id)
        return

      try {

        await approveOrder.mutateAsync(
          Number(id)
        )

        alert(
          'Orden aprobada correctamente'
        )

        window.location.reload()

      }

      catch (error) {

        console.error(error)

        alert(
          'Error al aprobar'
        )

      }

    }

const handleInvoice =
  async () => {

    if (!data) return

    if (
      data.lines.length === 0
    ) {

      alert(
        'La orden no tiene líneas para facturar'
      )

      return

    }

    try {

      const payload = {

        sales_order:
          data.id,

        invoice_date:
          new Date()
            .toISOString()
            .split('T')[0],

        lines:

          data.lines.map(
            (line: any) => ({

              sales_order_line:
                line.id,

              quantity:
                Number(
                  line.quantity
                )

            })
          )

      }

      const invoice =

        await createInvoice
          .mutateAsync(
            payload
          )

      alert(
        'Factura creada correctamente'
      )

      navigate(
        `/sales/invoices/${invoice.id}`
      )

    }

    catch (error) {

      console.error(
        error
      )

      alert(
        'Error al generar factura'
      )

    }

  }
  const handleReopen =
    async () => {

      if (!id)
        return

      try {

        await reopenOrder
          .mutateAsync(
            Number(id)
          )

        alert(
          'Orden reabierta correctamente'
        )

        window.location.reload()

      }

      catch (error) {

        console.error(
          error
        )

        alert(
          'Error al reabrir'
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

  return (

    <AppLayout>

      <div
        className="
          space-y-6
        "
      >

        <div>

          <button

            onClick={() =>

              navigate(
                '/sales/orders'
              )

            }

            className="
                    bg-gray-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    font-medium
                  "
          >

            ← Volver a Órdenes

          </button>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            {data.document_number}
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Cliente: {data.customer_name}
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            p-6
          "
        >

          <div
            className="
              grid
              grid-cols-4
              gap-6
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Fecha
              </p>

              <p>
                {data.document_date}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Estado
              </p>

              <StatusBadge
                status={data.status}
              />

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Moneda
              </p>

              <p>
                {data.currency_code}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Total
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Bs {data.total_amount}
              </p>

            </div>

          </div>

        </div>

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
              text-xl
              font-semibold
              mb-4
            "
          >
            Productos
          </h2>

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr>

                <th className="text-left">
                  Producto
                </th>

                <th className="text-left">
                  Cantidad
                </th>

                <th className="text-left">
                  Precio
                </th>

                <th className="text-left">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {
                data.lines.map(
                  (line: any) => (

                    <tr
                      key={line.id}
                    >

                      <td>
                        {line.product_name}
                      </td>

                      <td>
                        {line.quantity}
                      </td>

                      <td>
                        Bs {line.unit_price}
                      </td>

                      <td>
                        Bs {line.line_total}
                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >

         {
          data.status === 'DRAFT' && (

            <>

              <button

                onClick={() =>

                  navigate(
                    `/sales/orders/${id}/edit`
                  )

                }

                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                "
              >

                Editar

              </button>

              <button

                onClick={handleApprove}

                disabled={
                  approveOrder.isPending
                }

                className="
                  bg-green-600
                  hover:bg-green-700
                  disabled:bg-gray-400
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                "
              >

                {
                  approveOrder.isPending

                    ? 'Aprobando...'

                    : 'Aprobar'
                }

              </button>

            </>

          )
        }
        {
          data.status === 'APPROVED' && (
            <div
              className="
                flex
                gap-2
              "
            >

              <button

                onClick={
                  handleInvoice
                }

                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-4
                  py-2
                  rounded-lg
                "
              >

                Facturar Orden

              </button>
            </div>
          )
        }

            <button

              onClick={
                handleReopen
              }

              className="
                bg-yellow-600
                hover:bg-yellow-700
                text-white
                px-4
                py-2
                rounded-lg
              "
            >

              Reabrir Orden

            </button>

          </div>

        </div>
        


    </AppLayout>

  )

}