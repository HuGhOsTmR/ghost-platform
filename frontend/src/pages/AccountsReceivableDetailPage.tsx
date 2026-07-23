import AppLayout
  from '../layouts/AppLayout'

import {
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useAccountsReceivableDetail
} from '../hooks/useAccountsReceivableDetail'

export default function AccountsReceivableDetailPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const location =
    useLocation()

  const {
    data,
    isLoading
  } = useAccountsReceivableDetail(
    id || ''
  )

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando cuenta por cobrar...
        </div>

      </AppLayout>

    )

  }

  if (!data) {

    return (

      <AppLayout>

        <div>
          Cuenta por cobrar no encontrada
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

              {data.document_number}

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
          <button

            onClick={() => {

              if (

                location.state?.returnTo ===
                '/finance/customer-statement'

              ) {

                navigate(

                  '/finance/customer-statement',

                  {

                    state: {

                      customerId:
                        location.state.customerId

                    }

                  }

                )

                return

              }

              if (

                location.state?.returnTo ===
                '/finance/aging-report'

              ) {

                navigate(
                  '/finance/aging-report'
                )

                return

              }

              navigate(
                '/finance/accounts-receivable'
              )

            }}
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
                Vencimiento
              </p>

              <p>
                {data.due_date}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Factura
              </p>

              <p>
                {data.invoice_number}
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
              text-lg
              font-semibold
              mb-4
            "
          >
            Información Financiera
          </h2>

          <div
            className="
              grid
              grid-cols-3
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
                Monto Original
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Bs {data.original_amount}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Pagado
              </p>

              <p
                className="
                  font-semibold
                  text-green-600
                "
              >
                Bs {data.paid_amount}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Saldo
              </p>

              <p
                className="
                  font-semibold
                  text-red-600
                "
              >
                Bs {data.balance_amount}
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
              text-lg
              font-semibold
              mb-4
            "
          >
            Pagos Aplicados
          </h2>

          {
            data.payments?.length > 0
              ? (

                <table
                  className="
                    w-full
                  "
                >

                  <thead>

                    <tr
                      className="
                        bg-gray-50
                      "
                    >

                      <th
                        className="
                          px-4
                          py-3
                          text-left
                        "
                      >
                        Pago
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-left
                        "
                      >
                        Fecha
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-right
                        "
                      >
                        Monto Aplicado
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-center
                        "
                      >
                        Estado
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-center
                        "
                      >
                        Acción
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      data.payments.map(
                        (
                          payment: any
                        ) => (

                          <tr

                            key={
                              payment.id
                            }

                            className="
                              border-t
                            "
                          >

                            <td
                              className="
                                px-4
                                py-3
                              "
                            >
                              {
                                payment.payment_number
                              }
                            </td>

                            <td
                              className="
                                px-4
                                py-3
                              "
                            >
                              {
                                payment.payment_date
                              }
                            </td>

                            <td
                              className="
                                px-4
                                py-3
                                text-right
                              "
                            >
                              Bs {
                                payment.amount
                              }
                            </td>

                            <td
                              className="
                                px-4
                                py-3
                                text-center
                              "
                            >

                              <StatusBadge
                                status={
                                  payment.status
                                }
                              />

                            </td>

                            <td
                              className="
                                px-4
                                py-3
                                text-center
                              "
                            >

                              <button

                                onClick={() =>

                                  navigate(

                                    `/finance/customer-payments/${payment.id}`,

                                    {

                                      state: {

                                        returnTo:
                                          `/finance/accounts-receivable/${data.id}`

                                      }

                                    }

                                  )

                                }

                                className="
                                  bg-blue-600
                                  hover:bg-blue-700
                                  text-white
                                  px-3
                                  py-1
                                  rounded
                                  text-sm
                                "
                              >

                                Ver Pago

                              </button>

                            </td>

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              )

              : (

                <p
                  className="
                    text-gray-500
                  "
                >
                  No existen pagos aplicados.
                </p>

              )
          }

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
                `/sales/invoices/${data.sales_invoice}`
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

            Ver Factura

          </button>

        </div>

      </div>

    </AppLayout>

  )

}