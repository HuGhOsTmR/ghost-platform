import { useState } from 'react'

import AppLayout
  from '../layouts/AppLayout'

export default function SalesOrderCreatePage() {

  const [header, setHeader] = useState({

    customer: '',

    document_date:
      new Date()
        .toISOString()
        .split('T')[0],

    currency: '',

    notes: ''

  })

  const [lines, setLines] = useState([

    {
      product: '',
      quantity: 1,
      unit_price: 0
    }

  ])

  const updateLine = (
    index: number,
    field: string,
    value: any
  ) => {

    const copy = [...lines]

    copy[index] = {

      ...copy[index],

      [field]: value

    }

    setLines(copy)

  }

  const addLine = () => {

    setLines([

      ...lines,

      {
        product: '',
        quantity: 1,
        unit_price: 0
      }

    ])

  }

  const saveOrder = () => {

    console.log({

      ...header,

      lines

    })

  }

  return (

    <AppLayout>

      <div
        className="
          space-y-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Nueva Orden de Venta
        </h1>

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
              gap-6
            "
          >

            <div>

              <label>
                Cliente
              </label>

              <input

                value={header.customer}

                onChange={(e) =>

                  setHeader({

                    ...header,

                    customer:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded
                  p-2
                "
              />

            </div>

            <div>

              <label>
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
                  rounded
                  p-2
                "
              />

            </div>

            <div>

              <label>
                Moneda
              </label>

              <input

                value={header.currency}

                onChange={(e) =>

                  setHeader({

                    ...header,

                    currency:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded
                  p-2
                "
              />

            </div>

            <div>

              <label>
                Notas
              </label>

              <input

                value={header.notes}

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
                  rounded
                  p-2
                "
              />

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

          <div
            className="
              flex
              justify-between
              items-center
              mb-4
            "
          >

            <h2
              className="
                text-xl
                font-semibold
              "
            >
              Productos
            </h2>

            <button

              onClick={addLine}

              className="
                bg-gray-100
                px-4
                py-2
                rounded
              "
            >
              Agregar Línea
            </button>

          </div>

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr>

                <th>
                  Producto
                </th>

                <th>
                  Cantidad
                </th>

                <th>
                  Precio
                </th>

              </tr>

            </thead>

            <tbody>

              {
                lines.map(
                  (
                    line,
                    index
                  ) => (

                    <tr
                      key={index}
                    >

                      <td>

                        <input

                          value={
                            line.product
                          }

                          onChange={(e) =>

                            updateLine(

                              index,

                              'product',

                              e.target.value

                            )

                          }

                        />

                      </td>

                      <td>

                        <input

                          type="number"

                          value={
                            line.quantity
                          }

                          onChange={(e) =>

                            updateLine(

                              index,

                              'quantity',

                              Number(
                                e.target.value
                              )

                            )

                          }

                        />

                      </td>

                      <td>

                        <input

                          type="number"

                          value={
                            line.unit_price
                          }

                          onChange={(e) =>

                            updateLine(

                              index,

                              'unit_price',

                              Number(
                                e.target.value
                              )

                            )

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

        <div>

          <button

            onClick={saveOrder}

            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Guardar Orden
          </button>

        </div>

      </div>

    </AppLayout>

  )

}