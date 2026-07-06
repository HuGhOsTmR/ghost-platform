import {
  Activity
} from 'lucide-react'

export default function RecentActivityCard() {

  const items = [

    'Pago recibido',

    'Factura creada',

    'Compra registrada',

    'Usuario inició sesión'
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
        Actividad Reciente
      </h3>

      <div className="space-y-3">

        {
          items.map((item) => (

            <div
              key={item}
              className="
                flex
                items-center
                gap-3
              "
            >

              <Activity
                size={16}
              />

              {item}

            </div>

          ))
        }

      </div>

    </div>
  )
}