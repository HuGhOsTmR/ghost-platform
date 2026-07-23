import AppLayout
  from '../layouts/AppLayout'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import {
  useSalesInvoice
} from '../hooks/useSalesInvoice'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useCancelSalesInvoice
} from '../hooks/useCancelSalesInvoice'


export default function SalesInvoiceDetailPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const cancelInvoice =
    useCancelSalesInvoice()

  const handleCancel =
    async () => {

      if (!id)
        return

      const confirmed =

        window.confirm(

          '¿Desea anular esta factura?'

        )

      if (!confirmed)
        return

      try {

        await cancelInvoice
          .mutateAsync(
            Number(id)
          )

        alert(
          'Factura anulada correctamente'
        )

        window.location.reload()

      }

      catch (error) {

        console.error(
          error
        )

        alert(
          'Error al anular factura'
        )

      }

    }
  const {
    data,
    isLoading
  } = useSalesInvoice(
    id || ''
  )

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando factura...
        </div>

      </AppLayout>

    )

  }

  if (!data) {

    return (

      <AppLayout>

        <div>
          Factura no encontrada
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

              {data.invoice_number}

            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Cliente:
              {' '}
              {data.customer_name}

            </p>

          </div>

          <div
            className="
              flex
              gap-3
            "
          >

            <button

              onClick={() =>

                navigate(
                  `/sales/orders/${data.sales_order}`
                )

              }

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2
                rounded-lg
              "
            >

              Ver Orden

            </button>

            {

              data.status !==
              'CANCELLED' && (

                <button

                  onClick={
                    handleCancel
                  }

                  disabled={
                    cancelInvoice.isPending
                  }

                  className="
                    bg-red-600
                    hover:bg-red-700
                    disabled:bg-gray-400
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >

                  {

                    cancelInvoice.isPending

                      ? 'Anulando...'

                      : 'Anular Factura'

                  }

                </button>

              )

            }

          </div>
          
          <button

            onClick={() =>

              navigate(
                '/sales/invoices'
              )

            }

            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-4
              py-2
              rounded-lg
            "
          >

            Volver

          </button>

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
                {data.invoice_date}
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
                  text-lg
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
            Productos Facturados
          </h2>

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr
                className="
                  border-b
                "
              >

                <th className="text-left py-2">
                  Producto
                </th>

                <th className="text-left py-2">
                  Cantidad
                </th>

                <th className="text-left py-2">
                  Precio
                </th>

                <th className="text-left py-2">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {
                data.lines.map(
                  (
                    line: any
                  ) => (

                    <tr
                      key={line.id}
                      className="
                        border-b
                      "
                    >

                      <td className="py-3">
                        {line.product_name}
                      </td>

                      <td className="py-3">
                        {line.quantity}
                      </td>

                      <td className="py-3">
                        Bs {line.unit_price}
                      </td>

                      <td className="py-3">
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
              mb-3
            "
          >
            Información Adicional
          </h2>

          <div
            className="
              grid
              grid-cols-2
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
                Orden de Venta
              </p>

              <p>
                #{data.sales_order}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Creado
              </p>

              <p>
                {data.created_at}
              </p>

            </div>




          </div>

        </div>

      </div>

    </AppLayout>

  )

}