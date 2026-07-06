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
      path: '/sales/orders'
    },

    {
      label: 'Compras',
      icon: Package
    },

    {
      label: 'Inventario',
      icon: Package
    },

    {
      label: 'Finanzas',
      icon: Landmark
    },

    {
      label: 'Tesorería',
      icon: Wallet
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
          menu.map((item) => {

            const Icon = item.icon

            return (

              <button
                key={item.label}

                onClick={() => {

                  if (item.path) {

                    navigate(
                      item.path
                    )

                  }

                }}

                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded
                  mb-1
                  text-left

                  hover:bg-[#FF1E1E]
                  transition
                "
              >

                <Icon size={18} />

                <span>
                  {item.label}
                </span>

              </button>

            )

          })
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