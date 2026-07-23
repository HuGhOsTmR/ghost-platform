import AppLayout
  from '../layouts/AppLayout'

import {
  useNavigate
} from 'react-router-dom'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useAgingReport
} from '../hooks/useAgingReport'

export default function AgingReportPage() {

  const navigate =
    useNavigate()

  const {
    data = [],
    isLoading
  } = useAgingReport()

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando Aging Report...
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
            Aging Report
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Antigüedad de saldos de cuentas por cobrar
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            overflow-hidden
          "
        >

          <div
            className="
              p-6
              border-b
            "
          >

            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Documentos Pendientes
            </h2>

          </div>

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
                  Cliente
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                  "
                >
                  Documento
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-left
                  "
                >
                  Vencimiento
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-right
                  "
                >
                  Saldo
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-center
                  "
                >
                  Días
                </th>

                <th
                  className="
                    px-4
                    py-3
                    text-center
                  "
                >
                  Bucket
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
                data.length === 0 && (

                  <tr>

                    <td
                      colSpan={7}
                      className="
                        text-center
                        py-8
                        text-gray-500
                      "
                    >
                      No existen documentos pendientes
                    </td>

                  </tr>

                )
              }

              {
                data.map(
                  (
                    item: any
                  ) => (

                    <tr

                      key={
                        item.id
                      }

                      className="
                        border-t
                        border-gray-100
                        hover:bg-gray-50
                      "
                    >

                      <td
                        className="
                          px-4
                          py-3
                        "
                      >
                        {
                          item.customer
                        }
                      </td>

                      <td
                        className="
                          px-4
                          py-3
                          font-medium
                        "
                      >
                        {
                          item.document_number
                        }
                      </td>

                      <td
                        className="
                          px-4
                          py-3
                        "
                      >
                        {
                          item.due_date
                        }
                      </td>

                      <td
                        className="
                          px-4
                          py-3
                          text-right
                          font-semibold
                        "
                      >
                        Bs {
                          item.balance_amount
                        }
                      </td>

                      <td
                        className="
                          px-4
                          py-3
                          text-center
                        "
                      >
                        {
                          item.days_overdue
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
                            item.bucket
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

                              `/finance/accounts-receivable/${item.id}`,

                              {

                                state: {

                                  returnTo:
                                    '/finance/aging-report'

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

                          Ver Cuenta

                        </button>

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