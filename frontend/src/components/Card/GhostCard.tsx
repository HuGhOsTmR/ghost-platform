interface Props {
  title: string
  value: string
}

export default function GhostCard({
  title,
  value
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-6
        border
        border-gray-200
      "
    >

      <p
        className="
          text-gray-500
          text-sm
        "
      >
        {title}
      </p>

      <h2
        className="
          text-3xl
          font-bold
          mt-2
        "
      >
        {value}
      </h2>

    </div>

  )
}