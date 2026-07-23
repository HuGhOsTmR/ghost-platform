import AppLayout
  from '../layouts/AppLayout'

import GhostDataGrid
  from '../components/DataGrid/GhostDataGrid'

import StatusBadge
  from '../components/Common/StatusBadge'

import {
  useAccountsReceivable
} from '../hooks/useAccountsReceivable'

import {
  Eye
} from 'lucide-react'

import {
  useNavigate
} from 'react-router-dom'

export default function AccountsReceivableListPage() {

  const navigate =
    useNavigate()

  const {
    data,
    isLoading
  } = useAccountsReceivable()

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
      key: 'invoice_number',
      label: 'Factura'
    },

    {
      key: 'document_date',
      label: 'Fecha'
    },

    {
      key: 'due_date',
      label: 'Vencimiento'
    },

    {
      key: 'original_amount',
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
      key: 'balance_amount',
      label: 'Saldo',

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
              `/finance/accounts-receivable/${row.id}`
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
          Cargando cuentas por cobrar...
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
            Cuentas por Cobrar
          </h1>

        </div>

        <GhostDataGrid

          columns={columns}

          data={data || []}

          onRowClick={(row) =>

            navigate(
              `/finance/accounts-receivable/${row.id}`
            )

          }

        />

      </div>

    </AppLayout>

  )

}