import AppLayout
  from '../layouts/AppLayout'

import GhostDataGrid
  from '../components/DataGrid/GhostDataGrid'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  usePurchaseOrders
} from '../hooks/usePurchaseOrders'

import {
  Eye
} from 'lucide-react'

import {
  useNavigate
} from 'react-router-dom'

export default function PurchaseOrdersPage() {

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = usePurchaseOrders()

  const columns = [

    {
      key: 'document_number',
      label: 'Documento'
    },

    {
      key: 'supplier_name',
      label: 'Proveedor'
    },

    {
      key: 'document_date',
      label: 'Fecha'
    },

    {
      key: 'expected_delivery_date',
      label: 'Entrega Esperada'
    },

    {
      key: 'currency_code',
      label: 'Moneda'
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

                `/purchases/orders/${row.id}`

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
            Órdenes de Compra
          </h1>

          <button

            onClick={() => {

              navigate(
                '/purchases/orders/new'
              )

            }}

            className="
              bg-blue-600
              hover:bg-blue-700
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

          data={
            data || []
          }

          onRowClick={(row) =>

            navigate(

              `/purchases/orders/${row.id}`

            )

          }

        />

      </div>

    </AppLayout>

  )

}