import {
  Plus,
  Trash2
} from 'lucide-react'

import GhostSearchSelect
  from '../Common/GhostSearchSelect'



interface Line {

  product: number

  unit_of_measure: number

  quantity: number

  unit_price: number

  tax_percentage: number

  notes: string

}

interface Props {

  lines: Line[]

  setLines: (
    lines: Line[]
  ) => void

  products: any[]

  units: any[]

}

export default function SalesOrderLines({

  lines,

  setLines,

  products,

  units

}: Props) {

  const addLine = () => {

    setLines([

      ...lines,

      {

        product: 0,

        unit_of_measure: 0,

        quantity: 1,

        unit_price: 0,

        tax_percentage: 0,

        notes: ''

      }

    ])

  }

  const removeLine = (
    index: number
  ) => {

    setLines(

      lines.filter(
        (_, i) => i !== index
      )

    )

  }

  const productOptions =

    products.map(
      product => ({

        value: product.id,

        label: product.name,

        product

      })
    )


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

  console.log(products)

  console.log(productOptions)


  return (

    <div
      className="
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          p-4
          border-b
        "
      >

        <h2
          className="
            text-lg
            font-semibold
          "
        >
          Productos
        </h2>

      </div>

      <div
        className="
          overflow-x-auto
        "
      >

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

              <th className="p-3 text-left">
                Producto
              </th>

              <th className="p-3 text-left">
                Unidad
              </th>

              <th className="p-3 text-left">
                Cantidad
              </th>

              <th className="p-3 text-left">
                Precio
              </th>

              <th className="p-3 text-left">
                Imp %
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3"></th>

            </tr>

          </thead>

          <tbody>

            {
              lines.map(
                (
                  line,
                  index
                ) => {

                  const total =

                    line.quantity *
                    line.unit_price

                  return (

                    <tr
                      key={index}
                      className="
                        border-t
                      "
                    >

                      <td className="p-3">

                        <GhostSearchSelect

                          options={productOptions}

                          value={

                            productOptions.find(

                              option =>

                                option.value ===
                                line.product

                            ) || null

                          }

                          placeholder="Buscar producto..."

                          onChange={(selected) => {

                            if (!selected)
                              return

                            const copy = [...lines]

                            copy[index] = {

                              ...copy[index],

                              product:
                                selected.value,

                              unit_price:
                                Number(
                                  selected.product.sale_price
                                )

                            }

                            setLines(copy)

                          }}

                        />

                      </td>

                      <td className="p-3">

                        <select

                          value={
                            line.unit_of_measure
                          }

                          onChange={(e) =>

                            updateLine(

                              index,

                              'unit_of_measure',

                              Number(
                                e.target.value
                              )

                            )

                          }

                          className="
                            w-full
                            border
                            rounded
                            p-2
                          "
                        >

                          <option value="">
                            Seleccione...
                          </option>

                          {
                            units.map(
                              unit => (

                                <option
                                  key={unit.id}
                                  value={unit.id}
                                >

                                  {unit.name}

                                </option>

                              )
                            )
                          }

                        </select>

                      </td>

                      <td className="p-3">

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

                          className="
                            w-full
                            border
                            rounded
                            p-2
                          "
                        />

                      </td>

                      <td className="p-3">

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

                          className="
                            w-full
                            border
                            rounded
                            p-2
                          "
                        />

                      </td>

                      <td className="p-3">

                        <input

                          type="number"

                          value={
                            line.tax_percentage
                          }

                          onChange={(e) =>

                            updateLine(

                              index,

                              'tax_percentage',

                              Number(
                                e.target.value
                              )

                            )

                          }

                          className="
                            w-full
                            border
                            rounded
                            p-2
                          "
                        />

                      </td>

                      <td
                        className="
                          p-3
                          font-semibold
                        "
                      >

                        Bs {
                          total.toFixed(2)
                        }

                      </td>

                      <td className="p-3">

                        <button

                          onClick={() =>
                            removeLine(
                              index
                            )
                          }

                        >

                          <Trash2
                            size={18}
                          />

                        </button>

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
            p-4
            border-t
            flex
            justify-center
          "
        >
          <button

              onClick={addLine}

              className="
                flex
                items-center
                gap-2
                bg-red-600
                hover:bg-red-700
                text-white
                px-3
                py-2
                rounded-lg
              "
            >

              <Plus size={16} />

              Agregar

            </button>
          </div>
    </div>

  )

}