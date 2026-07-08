
interface Props {

  title: string

  value: string | number

  icon: any

  subtitle?: string

  trend?: 'up' | 'down' | 'neutral'
}

export default function GhostStatCard({

  title,

  value,

  icon: Icon,

  subtitle,

  trend = 'neutral'

}: Props) {

  const trendColor = {

    up: 'text-green-600',

    down: 'text-red-600',

    neutral: 'text-gray-500'

  }

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        border-gray-200
        p-6
        hover:shadow-md
        transition
      "
    >

      <div
        className="
          flex
          justify-between
          items-start
        "
      >

        <div>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {title}
          </p>

          <h2
            className="
              text-4xl
              font-bold
              mt-3
              text-gray-900
            "
          >
            {value}
          </h2>

        </div>

        <Icon
          size={32}
          className="
            text-gray-400
          "
        />

      </div>

      {subtitle && (

        <div
          className={`
            mt-4
            text-sm
            ${trendColor[trend]}
          `}
        >
          {subtitle}
        </div>

      )}

    </div>
  )
}