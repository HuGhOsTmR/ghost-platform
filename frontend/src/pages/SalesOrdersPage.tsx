import AppLayout
  from '../layouts/AppLayout'

import GhostDataGrid
  from '../components/DataGrid/GhostDataGrid'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useSalesOrders
} from '../hooks/useSalesOrders'

import {
  Eye,
  Pencil
} from 'lucide-react'

import {
  useNavigate
} from 'react-router-dom'

export default function SalesOrdersPage() {

  const navigate = useNavigate()

  const {
    data,
    isLoading
  } = useSalesOrders()

  const columns = [

    {
      key: 'document_number',
      label: 'Documento'
    },

    {
      key: 'customer_name',
      label: 'Cliente'
    },

    {
      key: 'document_date',
      label: 'Fecha'
    },

    {
      key: 'status',
      label: 'Estado',

      render: (
        value: string
      ) => (

        <StatusBadge
          status={value}
        />

      )
    },

    {
      key: 'total_amount',
      label: 'Total',

      render: (
        value: string
      ) => (

        <span>
          Bs {value}
        </span>

      )
    },

    {
      key: 'actions',
      label: 'Acciones',

      render: (
        _: any,
        row: any
      ) => (

        <div
          className="
            flex
            gap-2
          "
        >

          <button

            onClick={(e) => {

              e.stopPropagation()
              navigate(
                `/sales/orders/${row.id}`
              )

            }}

            className="
              p-2
              rounded
              hover:bg-gray-100
            "
          >

            <Eye size={16} />

          </button>

          <button

            onClick={(e) => {

              e.stopPropagation()

              navigate(
                `/sales/orders/${row.id}/edit`
              )

            }}

            className="
              p-2
              rounded
              hover:bg-gray-100
            "
          >

            <Pencil size={16} />

          </button>

        </div>

      )
    }

  ]

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando órdenes...
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

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Órdenes de Venta
          </h1>


          <button
            onClick={() => {
              navigate('/sales/orders/new')
            }}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Nueva Orden
          </button>
        </div>

        <GhostDataGrid

          columns={columns}

          data={data || []}

          onRowClick={(row) =>

            navigate(
              `/sales/orders/${row.id}`
            )

          }

        />

      </div>

    </AppLayout>

  )
}