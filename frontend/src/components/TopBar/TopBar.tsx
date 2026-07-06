export default function TopBar() {

  return (

    <header
      className="
        h-16
        bg-[#1A1A1A]
        text-white

        flex
        items-center
        justify-between

        px-6
      "
    >

      <input

        placeholder="Buscar..."

        className="
          w-96
          px-4
          py-2

          bg-[#2D2D2D]

          rounded
        "
      />

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <span>
          Medunz Pharma
        </span>

        <span>
          Casa Matriz
        </span>

        <span>
          Hugo Medina
        </span>

      </div>

    </header>

  )
}