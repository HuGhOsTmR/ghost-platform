interface Props {

  title: string

  aging: {

    current: number

    days_1_30: number

    days_31_60: number

    days_61_90: number

    days_90_plus: number
  }
}

export default function AgingCard({

  title,

  aging

}: Props) {

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
        {title}
      </h3>

      <div className="space-y-2">

        <Row
          label="Actual"
          value={aging.current}
        />

        <Row
          label="1 - 30 días"
          value={aging.days_1_30}
        />

        <Row
          label="31 - 60 días"
          value={aging.days_31_60}
        />

        <Row
          label="61 - 90 días"
          value={aging.days_61_90}
        />

        <Row
          label="90+ días"
          value={aging.days_90_plus}
        />

      </div>

    </div>
  )
}

function Row({

  label,

  value

}: {

  label: string

  value: number

}) {

  return (

    <div
      className="
        flex
        justify-between
      "
    >

      <span
        className="
          text-gray-500
        "
      >
        {label}
      </span>

      <span
        className="
          font-medium
        "
      >
        Bs {value}
      </span>

    </div>
  )
}