import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'

const data = [
  { day: 'Lun', value: 60 },
  { day: 'Mar', value: 120 },
  { day: 'Mié', value: 90 },
  { day: 'Jue', value: 180 },
  { day: 'Vie', value: 125 }
]

export default function CashFlowChart() {

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

      <h3 className="font-semibold mb-4">
        Flujo de Tesorería
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart data={data}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF1E1E"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}