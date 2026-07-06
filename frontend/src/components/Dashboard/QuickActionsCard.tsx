import {
  Plus,
  ShoppingCart,
  Package,
  Users
} from 'lucide-react'

export default function QuickActionsCard() {

  const actions = [

    {
      label: 'Nueva Venta',
      icon: ShoppingCart
    },

    {
      label: 'Nueva Compra',
      icon: Package
    },

    {
      label: 'Nuevo Cliente',
      icon: Users
    },

    {
      label: 'Nuevo Registro',
      icon: Plus
    }
  ]

  return (

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

      <h3
        className="
          font-semibold
          mb-4
        "
      >
        Acciones Rápidas
      </h3>

      <div className="space-y-3">

        {
          actions.map((action) => {

            const Icon = action.icon

            return (

              <button
                key={action.label}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  border
                  border-gray-200

                  hover:bg-gray-50
                  transition
                "
              >

                <Icon size={18} />

                {action.label}

              </button>

            )

          })
        }

      </div>

    </div>
  )
}