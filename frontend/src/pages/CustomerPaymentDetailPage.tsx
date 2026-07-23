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
  useCustomerPayment
} from '../hooks/useCustomerPayment'



export default function CustomerPaymentDetailPage() {

  const { id } =
    useParams()

  const navigate =
    useNavigate()

  const location =
    useLocation()

  const {
    data,
    isLoading
  } = useCustomerPayment(
    id || ''
  )

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando cobro...
        </div>

      </AppLayout>

    )

  }

  if (!data) {

    return (

      <AppLayout>

        <div>
          Cobro no encontrado
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
              {data.payment_number}
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

            onClick={() =>

              navigate(

                location.state?.returnTo

                ||

                '/finance/customer-payments'

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
                {data.payment_date}
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
                Monto
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Bs {data.amount}
              </p>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Referencia
              </p>

              <p>
                {data.reference || '-'}
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
            Aplicaciones del Pago
          </h2>

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr>

                <th className="text-left">
                  Cuenta por Cobrar
                </th>

                <th className="text-left">
                  Importe Aplicado
                </th>

              </tr>

            </thead>

            <tbody>

              {
                data.allocations.map(
                  (
                    allocation: any
                  ) => (

                    <tr
                      key={
                        allocation.id
                      }
                    >

                      <td>

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <span>

                            {
                              allocation.receivable_number
                            }

                          </span>

                          <button

                            onClick={() =>

                              navigate(

                                `/finance/accounts-receivable/${allocation.accounts_receivable}`

                              )

                            }

                            className="
                              text-blue-600
                              hover:text-blue-800
                              text-sm
                              font-medium
                            "
                          >

                            Ver Cuenta

                          </button>

                        </div>

                      </td>

                      <td>
                        Bs {
                          allocation.amount
                        }
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