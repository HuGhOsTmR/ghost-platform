import AppLayout
  from '../layouts/AppLayout'

import GhostDataGrid
  from '../components/DataGrid/GhostDataGrid'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useCustomerPayments
} from '../hooks/useCustomerPayments'

import {
  Eye
} from 'lucide-react'

import {
  useNavigate
} from 'react-router-dom'

export default function CustomerPaymentListPage() {

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useCustomerPayments()

  const columns = [

    {
      key: 'payment_number',
      label: 'Nro. Cobro'
    },

    {
      key: 'customer_name',
      label: 'Cliente'
    },

    {
      key: 'payment_date',
      label: 'Fecha'
    },

    {
      key: 'amount',
      label: 'Monto',

      render: (
        value: string
      ) => (

        <span>

          Bs {value}

        </span>

      )

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
      key: 'actions',
      label: 'Acciones',

      render: (
        _: any,
        row: any
      ) => (

        <button

          onClick={(e) => {

            e.stopPropagation()

            navigate(
              `/finance/customer-payments/${row.id}`
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

      )

    }

  ]

  if (isLoading) {

    return (

      <AppLayout>

        <div>
          Cargando cobros...
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
            Cobros de Clientes
          </h1>

        </div>

        <GhostDataGrid

          columns={columns}

          data={data || []}

          onRowClick={(row) =>

            navigate(
              `/finance/customer-payments/${row.id}`
            )

          }

        />

      </div>

    </AppLayout>

  )

}