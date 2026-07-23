import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Landmark,
  Wallet,
  Users,
  UserRound,
  Factory,
  BarChart3,
  Settings,
  Shield,
  CircleHelp,
  LogOut
} from 'lucide-react'

import { useNavigate }
  from 'react-router-dom'

import {
  useAuthStore
} from '../../store/authStore'

import GhostSidebarItem
  from './GhostSidebarItem'
  
export default function Sidebar() {

  const navigate = useNavigate()

  const logout =
    useAuthStore(
      (state) => state.logout
    )

const menu = [

    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },

    {
      label: 'Ventas',
      icon: ShoppingCart,

      children: [

        {
          label: 'Órdenes',
          path: '/sales/orders'
        },

        {
          label: 'Facturas',
          path: '/sales/invoices'
        },

        {
          label: 'Clientes',
          path: '/mdm/customers'
        }

      ]
    },

    {
      label: 'Compras',
      icon: Package,

      children: [

        {
          label: 'Órdenes',
          path: '/purchases/orders'
        },

        {
          label: 'Recepciones',
          path: '/purchases/receipts'
        },

        {
          label: 'Proveedores',
          path: '/mdm/suppliers'
        }

      ]
    },

    {
      label: 'Inventario',
      icon: Package,

      children: [

        {
          label: 'Stock',
          path: '/inventory/stock'
        },

        {
          label: 'Almacenes',
          path: '/inventory/warehouses'
        },

        {
          label: 'Transferencias',
          path: '/inventory/transfers'
        }

      ]
    },

    {
      label: 'Tesorería',
      icon: Wallet,

      children: [

        {
          label: 'Caja',
          path: '/treasury/cash-accounts'
        },

        {
          label: 'Bancos',
          path: '/treasury/bank-accounts'
        },

        {
          label: 'Movimientos',
          path: '/treasury/transactions'
        }

      ]
    },

   {
      label: 'Finanzas',
      icon: Landmark,

      children: [

        {
          label: 'Dashboard',
          path: '/finance/dashboard'
        },

        {
          label: 'Cuentas por Cobrar',
          path: '/finance/accounts-receivable'
        },

        {
          label: 'Estado de Cuenta',
          path: '/finance/customer-statement'
        },
        
        {
          label: 'Aging Report',
          path: '/finance/aging-report'
        },
        
        {
          label: 'Cobros',
          path: '/finance/customer-payments'
        },

        {
          label: 'Cuentas por Pagar',
          path: '/finance/accounts-payable'
        }

      ]
    },

    {
      label: 'CRM',
      icon: Users
    },

    {
      label: 'Recursos Humanos',
      icon: UserRound
    },

    {
      label: 'Producción',
      icon: Factory
    },

    {
      label: 'Reportes',
      icon: BarChart3
    },

    {
      label: 'Configuración',
      icon: Settings
    },

    {
      label: 'Seguridad',
      icon: Shield
    },

    {
      label: 'Ayuda',
      icon: CircleHelp
    }

  ]

  return (

    <aside
      className="
        w-52
        bg-[#0A0A0A]
        text-white
        h-screen
        flex
        flex-col
      "
    >

      <div
        className="
          h-20
          flex
          items-center
          px-6
          border-b
          border-[#1A1A1A]
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-red-500
            "
          >
            GHOST
          </h1>

          <p
            className="
              text-xs
              text-gray-400
            "
          >
            ERP Platform
          </p>

        </div>

      </div>

      <nav
        className="
          flex-1
          p-4
        "
      >

        {
          menu.map(
            (item) => (

              <GhostSidebarItem

                key={item.label}

                label={item.label}

                icon={item.icon}

                path={item.path}

                children={item.children}

              />

            )
          )
        }
      </nav>

      <div
        className="
          p-4
          border-t
          border-[#1A1A1A]
        "
      >

        <button

          onClick={() => {

            logout()

            navigate('/login')

          }}

          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded

            hover:bg-red-600
            transition
          "
        >

          <LogOut size={18} />

          <span>
            Cerrar sesión
          </span>

        </button>

      </div>

    </aside>

  )
}