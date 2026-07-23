import {
  useState
} from 'react'

import AppLayout
  from '../layouts/AppLayout'

import GhostSearchSelect
  from '../components/Common/GhostSearchSelect'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useCustomers
} from '../hooks/useCustomers'

import {
  useCustomerStatement
} from '../hooks/useCustomerStatement'

import {
  useNavigate,
  useLocation
} from 'react-router-dom'

export default function CustomerStatementPage() {

  const navigate =
    useNavigate()

  const location =
    useLocation()
    
  const [
    customerId,
    setCustomerId
  ] = useState<number | undefined>(

    location.state?.customerId

  )

  const {
    data: customers = []
  } = useCustomers()

  const {
    data,
    isLoading
  } = useCustomerStatement(
    customerId
  )


  const customerOptions =

    customers.map(
      (customer: any) => ({

        value:
          customer.id,

        label:
          customer.name

      })
    )

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
            Estado de Cuenta Cliente
          </h1>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Consulta de saldos y documentos pendientes
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            shadow-sm
            p-6
          "
        >

          <div
            className="
              max-w-lg
            "
          >

            <label
              className="
                block
                text-sm
                font-medium
                mb-2
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
                    customerId

                ) || null

              }

              placeholder="
                Buscar cliente...
              "

              onChange={(
                selected
              ) =>

                setCustomerId(
                  selected?.value
                )

              }

            />

          </div>

        </div>

        {
          customerId && data && (

            <>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-6
                "
              >

                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    shadow-sm
                    p-6
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Cliente
                  </p>

                  <h2
                    className="
                      text-xl
                      font-semibold
                      mt-2
                    "
                  >
                    {data.customer}
                  </h2>

                </div>

                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    shadow-sm
                    p-6
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    Saldo Pendiente
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-red-600
                      mt-2
                    "
                  >
                    Bs {data.total_balance}
                  </h2>

                </div>

              </div>

              <div
                className="
                  bg-white
                  rounded-xl
                  border
                  border-gray-200
                  shadow-sm
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
                    Documentos
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
                        Documento
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
                        Original
                      </th>

                      <th
                        className="
                          px-4
                          py-3
                          text-right
                        "
                      >
                        Pagado
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
                        Estado
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      data.documents.map(
                        (
                          document: any,
                          index: number
                        ) => (

                          <tr

                            key={index}

                            onClick={() =>

                              navigate(

                                `/finance/accounts-receivable/${document.id}`,

                                {

                                  state: {

                                    returnTo:
                                      '/finance/customer-statement',

                                    customerId:
                                      customerId

                                  }

                                }

                              )

                            }

                            className="
                              border-t
                              border-gray-100
                              hover:bg-gray-50
                              cursor-pointer
                            "
                          >

                            <td
                              className="
                                px-4
                                py-3
                              "
                            >
                              {
                                document.document_number
                              }
                            </td>

                            <td
                              className="
                                px-4
                                py-3
                              "
                            >
                              {
                                document.document_date
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
                                document.original_amount
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
                                document.paid_amount
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
                                document.balance_amount
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
                                  document.status
                                }

                              />

                            </td>

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            </>

          )
        }

        {
          isLoading && (

            <div
              className="
                bg-white
                rounded-xl
                border
                border-gray-200
                p-6
              "
            >
              Cargando estado de cuenta...
            </div>

          )
        }

      </div>

    </AppLayout>

  )

}