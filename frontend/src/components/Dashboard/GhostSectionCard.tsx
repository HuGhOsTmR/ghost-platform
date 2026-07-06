interface Props {

  title: string

  children: React.ReactNode
}

export default function GhostSectionCard({

  title,

  children

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
          text-lg
          font-semibold
          mb-4
          text-gray-800
        "
      >
        {title}
      </h3>

      {children}

    </div>

  )
}