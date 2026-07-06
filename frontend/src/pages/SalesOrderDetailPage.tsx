import AppLayout
  from '../layouts/AppLayout'

import {
  useParams
} from 'react-router-dom'

import {
  useSalesOrder
} from '../hooks/useSalesOrder'

import StatusBadge
  from '../components/Common/StatusBadge'

export default function SalesOrderDetailPage() {

  const { id } = useParams()

  const {
    data,
    isLoading
  } = useSalesOrder(
    id || ''
  )

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

      </div>

    </AppLayout>

  )

}