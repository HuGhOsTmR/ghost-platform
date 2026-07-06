interface Props {
  status: string
}

export default function StatusBadge({
  status
}: Props) {

  const styles = {

    DRAFT:
      'bg-yellow-100 text-yellow-800',

    APPROVED:
      'bg-green-100 text-green-800',

    POSTED:
      'bg-blue-100 text-blue-800',

    PAID:
      'bg-green-100 text-green-800',

    CANCELLED:
      'bg-red-100 text-red-800'
  }

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${
          styles[
            status as keyof typeof styles
          ] ||
          'bg-gray-100 text-gray-800'
        }
      `}
    >

      {status}

    </span>

  )
}