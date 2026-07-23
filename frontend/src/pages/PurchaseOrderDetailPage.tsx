import AppLayout
  from '../layouts/AppLayout'

import {
  useParams,
  useNavigate
} from 'react-router-dom'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  usePurchaseOrder
} from '../hooks/usePurchaseOrder'

export default function PurchaseOrderDetailPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = usePurchaseOrder(
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

          <button

            onClick={() =>

              navigate(
                '/purchases/orders'
              )

            }

            className="
              bg-gray-500
              hover:bg-gray-600
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
              mt-4
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
            Proveedor:
            {' '}
            {data.supplier_name}
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
              grid-cols-2
              md:grid-cols-4
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
                Entrega Esperada
              </p>

              <p>
                {
                  data.expected_delivery_date ||
                  '-'
                }
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
                status={
                  data.status
                }
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
                {
                  data.currency_code
                }
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

                <th
                  className="
                    text-left
                  "
                >
                  Producto
                </th>

                <th
                  className="
                    text-left
                  "
                >
                  Pedido
                </th>

                <th
                  className="
                    text-left
                  "
                >
                  Recibido
                </th>

                <th
                  className="
                    text-left
                  "
                >
                  Pendiente
                </th>

                <th
                  className="
                    text-left
                  "
                >
                  Precio
                </th>

                <th
                  className="
                    text-left
                  "
                >
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {

                data.lines.map(
                  (
                    line: any
                  ) => {

                    const pending =

                      Number(
                        line.quantity
                      ) -

                      Number(
                        line.received_quantity
                      )

                    return (

                      <tr
                        key={
                          line.id
                        }
                      >

                        <td>
                          {
                            line.product_name
                          }
                        </td>

                        <td>
                          {
                            line.quantity
                          }
                        </td>

                        <td>
                          {
                            line.received_quantity
                          }
                        </td>

                        <td>

                          <span
                            className={

                              pending > 0

                                ? 'text-orange-600 font-medium'

                                : 'text-green-600 font-medium'

                            }
                          >

                            {pending}

                          </span>

                        </td>

                        <td>
                          Bs {
                            line.unit_price
                          }
                        </td>

                        <td>
                          Bs {
                            line.line_total
                          }
                        </td>

                      </tr>

                    )

                  }

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

          <div
            className="
              flex
              justify-end
            "
          >

            <div
              className="
                text-right
                space-y-2
              "
            >

              <div>

                Subtotal:

                <strong>
                  {' '}
                  Bs {
                    data.subtotal
                  }
                </strong>

              </div>

              <div>

                Impuestos:

                <strong>
                  {' '}
                  Bs {
                    data.tax_amount
                  }
                </strong>

              </div>

              <div
                className="
                  text-xl
                  font-bold
                "
              >

                Total:

                {' '}

                Bs {
                  data.total_amount
                }

              </div>

            </div>

          </div>

        </div>

        {

          data.status !==
            'RECEIVED'

          &&

          data.status !==
            'CANCELLED'

          && (

            <div
              className="
                flex
                justify-end
              "
            >

              <button

                onClick={() =>

                  navigate(

                    `/purchases/orders/${id}/receive`

                  )

                }

                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                "
              >

                Recibir Orden

              </button>

            </div>

          )

        }

      </div>

    </AppLayout>

  )

}