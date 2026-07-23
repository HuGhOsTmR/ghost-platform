import {
  ChevronDown,
  ChevronRight
} from 'lucide-react'

import {
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

interface MenuChild {

  label: string

  path: string

}

interface Props {

  label: string

  icon: any

  path?: string

  children?: MenuChild[]

}

export default function GhostSidebarItem({

  label,

  icon: Icon,

  path,

  children

}: Props) {

  const navigate =
    useNavigate()

  const [expanded, setExpanded] =
    useState(false)

  const hasChildren =
    children &&
    children.length > 0

  return (

    <div>

      <button

        onClick={() => {

          if (hasChildren) {

            setExpanded(
              !expanded
            )

            return

          }

          if (path) {

            navigate(path)

          }

        }}

        className="
          w-full
          flex
          items-center
          justify-between
          px-4
          py-3
          rounded
          hover:bg-[#FF1E1E]
          transition
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Icon size={18} />

          <span>

            {label}

          </span>

        </div>

        {

          hasChildren && (

            expanded

              ? <ChevronDown size={16} />

              : <ChevronRight size={16} />

          )

        }

      </button>

      {

        expanded &&
        children && (

          <div
            className="
              ml-8
              mt-1
              space-y-1
            "
          >

            {

              children.map(
                child => (

                  <button

                    key={child.path}

                    onClick={() =>

                      navigate(
                        child.path
                      )

                    }

                    className="
                      w-full
                      text-left
                      px-3
                      py-2
                      rounded
                      text-sm
                      text-gray-300
                      hover:bg-[#202020]
                    "
                  >

                    {child.label}

                  </button>

                )
              )

            }

          </div>

        )

      }

    </div>

  )

}