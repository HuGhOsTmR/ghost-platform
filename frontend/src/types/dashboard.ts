export interface FinanceDashboard {

  receivables: {
    total_balance: number

    aging: {
      current: number
      days_1_30: number
      days_31_60: number
      days_61_90: number
      days_90_plus: number
    }
  }

  payables: {
    total_balance: number

    aging: {
      current: number
      days_1_30: number
      days_31_60: number
      days_61_90: number
      days_90_plus: number
    }
  }

  working_capital: number
}

export interface TreasuryDashboard {

  bank_balance: number
  cash_balance: number
  today_inflows: number
  today_outflows: number
  net_position: number
}