import AppLayout from '../layouts/AppLayout'

import GhostCard
  from '../components/Card/GhostCard'

import GhostSectionCard
  from '../components/Dashboard/GhostSectionCard'

import AgingCard
  from '../components/Dashboard/AgingCard'

import QuickActionsCard
  from '../components/Dashboard/QuickActionsCard'

import RecentActivityCard
  from '../components/Dashboard/RecentActivityCard'

import CashFlowChart
  from '../components/Dashboard/CashFlowChart'

import {
  useFinanceDashboard,
  useTreasuryDashboard
} from '../hooks/useDashboard'


import {
  Landmark,
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart
} from 'lucide-react'

import GhostStatCard
  from '../components/Dashboard/GhostStatCard'

export default function DashboardPage() {

  const {
    data: finance
  } = useFinanceDashboard()

  const {
    data: treasury
  } = useTreasuryDashboard()

  return (

    <AppLayout>

      <div className="space-y-6">

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Dashboard Ejecutivo
          </h1>

        </div>

        <div
          className="
            grid
            grid-cols-5
            gap-6
          "
        >

          <GhostStatCard
            title="Banco"
            value={`Bs ${treasury?.bank_balance ?? 0}`}
            icon={Landmark}
            subtitle="Saldo disponible"
          />

          <GhostStatCard
            title="Caja"
            value={`Bs ${treasury?.cash_balance ?? 0}`}
            icon={Wallet}
            subtitle="Caja general"
          />

          <GhostStatCard
            title="Ingresos Hoy"
            value={`Bs ${treasury?.today_inflows ?? 0}`}
            icon={TrendingUp}
            subtitle="Movimientos de entrada"
            trend="up"
          />

          <GhostStatCard
            title="Egresos Hoy"
            value={`Bs ${treasury?.today_outflows ?? 0}`}
            icon={TrendingDown}
            subtitle="Movimientos de salida"
            trend="down"
          />

          <GhostStatCard
            title="Capital Trabajo"
            value={`Bs ${finance?.working_capital ?? 0}`}
            icon={PieChart}
            subtitle="Posición financiera"
          />

        </div>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <GhostSectionCard
          title="Cuentas por Cobrar"
        >

          <div
            className="
              text-4xl
              font-bold
            "
          >
            Bs {
              finance?.receivables
                ?.total_balance ?? 0
            }
          </div>

        </GhostSectionCard>

        <GhostSectionCard
          title="Cuentas por Pagar"
        >

          <div
            className="
              text-4xl
              font-bold
            "
          >
            Bs {
              finance?.payables
                ?.total_balance ?? 0
            }
          </div>

        </GhostSectionCard>

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <AgingCard
          title="Aging Cuentas por Cobrar"
          aging={
            finance?.receivables?.aging ?? {
              current: 0,
              days_1_30: 0,
              days_31_60: 0,
              days_61_90: 0,
              days_90_plus: 0
            }
          }
        />

        <AgingCard
          title="Aging Cuentas por Pagar"
          aging={
            finance?.payables?.aging ?? {
              current: 0,
              days_1_30: 0,
              days_31_60: 0,
              days_61_90: 0,
              days_90_plus: 0
            }
          }
        />

      </div>
      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <RecentActivityCard />

        <QuickActionsCard />

      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <CashFlowChart />

        <GhostSectionCard
          title="Resumen Financiero"
        >

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Banco</span>
              <span>Bs {treasury?.bank_balance}</span>
            </div>

            <div className="flex justify-between">
              <span>Caja</span>
              <span>Bs {treasury?.cash_balance}</span>
            </div>

            <div className="flex justify-between">
              <span>Capital Trabajo</span>
              <span>
                Bs {finance?.working_capital}
              </span>
            </div>

          </div>

        </GhostSectionCard>

      </div>

    </AppLayout>
  )
}