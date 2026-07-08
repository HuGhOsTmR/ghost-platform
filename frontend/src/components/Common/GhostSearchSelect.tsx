import Select from 'react-select'

interface Option {

  value: number

  label: string

  [key: string]: any

}

interface Props {

  options: Option[]

  value?: Option | null

  placeholder?: string

  onChange: (
    option: Option | null
  ) => void

}

export default function GhostSearchSelect({

  options,

  value,

  placeholder = 'Buscar...',

  onChange

}: Props) {

  return (

    <Select

      options={options}

      value={value}

      menuPortalTarget={document.body}

      placeholder={placeholder}

      onChange={(option) =>

        onChange(
          option as Option
        )

      }

      className="text-sm"

      styles={{

        control: (

          base

        ) => ({

          ...base,

          minHeight: 42,

          borderRadius: 8,

          borderColor: '#d1d5db',

          boxShadow: 'none'

        }),

        menuPortal: (
          base
        ) => ({

          ...base,

          zIndex: 9999

        }),


        menu: (

          base

        ) => ({

          ...base,

          zIndex: 9999

        })

      }}

    />

  )

}