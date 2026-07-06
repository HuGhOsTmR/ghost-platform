interface Column {

  key: string

  label: string

  render?: (
    value: any,
    row: any
  ) => React.ReactNode
}

interface Props {

  columns: Column[]

  data: any[]
}

export default function GhostDataGrid({

  columns,

  data

}: Props) {

  return (

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

            {
              columns.map(
                (
                  column
                ) => (

                  <th
                    key={column.key}
                    className="
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-semibold
                    "
                  >

                    {column.label}

                  </th>

                )
              )
            }

          </tr>

        </thead>

        <tbody>

          {
            data.map(
              (
                row,
                index
              ) => (

                <tr
                  key={row.id || index}
                  className="
                    border-t
                    border-gray-100
                    hover:bg-gray-50
                  "
                >

                  {
                    columns.map(
                      (
                        column
                      ) => (

                        <td
                          key={column.key}
                          className="
                            px-4
                            py-3
                          "
                        >

                          {
                            column.render

                              ? column.render(
                                  row[
                                    column.key
                                  ],
                                  row
                                )

                              : row[
                                  column.key
                                ]
                          }

                        </td>

                      )
                    )
                  }

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  )
}