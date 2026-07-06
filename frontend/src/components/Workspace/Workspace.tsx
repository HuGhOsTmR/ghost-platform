interface Props {
  children: React.ReactNode
}

export default function Workspace({
  children
}: Props) {

  return (

    <main
      className="
        flex-1
        overflow-auto
        bg-[#F5F5F5]
        p-6
      "
    >
      {children}
    </main>

  )
}