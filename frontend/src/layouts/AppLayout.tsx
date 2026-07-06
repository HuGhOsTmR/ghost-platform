import Sidebar from '../components/Sidebar/Sidebar'
import TopBar from '../components/TopBar/TopBar'
import Workspace from '../components/Workspace/Workspace'

interface Props {
  children: React.ReactNode
}

export default function AppLayout({
  children
}: Props) {

  return (

    <div
      className="
        flex
        h-screen
      "
    >

      <Sidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <TopBar />

        <Workspace>

          {children}

        </Workspace>

      </div>

    </div>

  )
}