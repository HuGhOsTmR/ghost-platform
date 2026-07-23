import AppLayout
  from '../layouts/AppLayout'

import {
  useFinanceDashboard
} from '../hooks/useFinanceDashboard'

export default function FinanceDashboardPage() {

  const {
    data,
    isLoading
  } = useFinanceDashboard()

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando dashboard financiero...
        </div>

      </AppLayout>

    )

  }

  if (!data) {

    return (

      <AppLayout>

        <div>
          No existe información financiera
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
            Dashboard Financiero
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Resumen financiero general
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-white
              rounded-xl
              border
              border-gray-200
              p-6
            "
          >

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Cuentas por Cobrar
            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
                text-blue-600
              "
            >
              Bs {data.receivables.total_balance}
            </h2>

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

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Cuentas por Pagar
            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
                text-red-600
              "
            >
              Bs {data.payables.total_balance}
            </h2>

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

            <p
              className="
                text-sm
                text-gray-500
              "
            >
              Capital de Trabajo
            </p>

            <h2
              className="
                text-3xl
                font-bold
                mt-2
                text-green-600
              "
            >
              Bs {data.working_capital}
            </h2>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

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
              Aging Cuentas por Cobrar
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
                    Rango
                  </th>

                  <th
                    className="
                      text-right
                    "
                  >
                    Saldo
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>
                    Vigente
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.receivables.aging.current}
                  </td>

                </tr>

                <tr>

                  <td>
                    1 - 30 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.receivables.aging.days_1_30}
                  </td>

                </tr>

                <tr>

                  <td>
                    31 - 60 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.receivables.aging.days_31_60}
                  </td>

                </tr>

                <tr>

                  <td>
                    61 - 90 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.receivables.aging.days_61_90}
                  </td>

                </tr>

                <tr>

                  <td>
                    Más de 90 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.receivables.aging.days_90_plus}
                  </td>

                </tr>

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
                text-xl
                font-semibold
                mb-4
              "
            >
              Aging Cuentas por Pagar
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
                    Rango
                  </th>

                  <th
                    className="
                      text-right
                    "
                  >
                    Saldo
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>
                    Vigente
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.payables.aging.current}
                  </td>

                </tr>

                <tr>

                  <td>
                    1 - 30 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.payables.aging.days_1_30}
                  </td>

                </tr>

                <tr>

                  <td>
                    31 - 60 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.payables.aging.days_31_60}
                  </td>

                </tr>

                <tr>

                  <td>
                    61 - 90 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.payables.aging.days_61_90}
                  </td>

                </tr>

                <tr>

                  <td>
                    Más de 90 días
                  </td>

                  <td
                    className="
                      text-right
                    "
                  >
                    Bs {data.payables.aging.days_90_plus}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AppLayout>

  )

}