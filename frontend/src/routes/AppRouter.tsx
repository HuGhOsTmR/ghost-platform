import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRoute from './ProtectedRoute'
import SalesOrderEditPage from '../pages/SalesOrderEditPage'
import SalesOrdersPage from '../pages/SalesOrdersPage'
import SalesOrderDetailPage from '../pages/SalesOrderDetailPage'
import SalesOrderCreatePage from '../pages/SalesOrderCreatePage'
import SalesInvoiceListPage from '../pages/SalesInvoiceListPage'
import SalesInvoiceDetailPage from '../pages/SalesInvoiceDetailPage'
import AccountsReceivableListPage from '../pages/AccountsReceivableListPage'
import AccountsReceivableDetailPage from '../pages/AccountsReceivableDetailPage'
import CustomerPaymentListPage from '../pages/CustomerPaymentListPage'
import CustomerPaymentDetailPage from '../pages/CustomerPaymentDetailPage'
import CustomerStatementPage from '../pages/CustomerStatementPage'
import FinanceDashboardPage from '../pages/FinanceDashboardPage'
import AgingReportPage from '../pages/AgingReportPage'
import PurchaseOrdersPage from '../pages/PurchaseOrdersPage'
import PurchaseOrderDetailPage from '../pages/PurchaseOrderDetailPage'
import PurchaseReceiptCreatePage from "../pages/PurchaseReceiptCreatePage";

export default function AppRouter() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/orders"
          element={
            <ProtectedRoute>
              <SalesOrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="/sales/orders/:id"
          element={
            <ProtectedRoute>
              <SalesOrderDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/orders/:id/edit"
          element={
            <SalesOrderEditPage />
          }
        />
        
        <Route

          path="/finance/dashboard"

          element={
            <FinanceDashboardPage />
          }

        />

        <Route

          path="/sales/invoices"

          element={
            <SalesInvoiceListPage />
          }

        />

        <Route

          path="/sales/invoices/:id"

          element={
            <SalesInvoiceDetailPage />
          }

        />

        <Route

          path="/finance/accounts-receivable"

          element={
            <AccountsReceivableListPage />
          }

        />

        <Route

          path="/finance/customer-payments/:id"

          element={
            <CustomerPaymentDetailPage />
          }

        />

        <Route

          path="/finance/customer-payments"

          element={
            <CustomerPaymentListPage />
          }

        />

        <Route

          path="/finance/aging-report"

          element={
            <AgingReportPage />
          }

        />
        
        <Route
          path="/sales/orders/:id/edit"
          element={
            <SalesOrderEditPage />
          }
        />
        
        <Route

          path="/finance/accounts-receivable/:id"

          element={
            <AccountsReceivableDetailPage />
          }

        />

        <Route

          path="/finance/customer-statement"

          element={
            <CustomerStatementPage />
          }

        />

        <Route
          path="/sales/orders/new"
          element={
            <ProtectedRoute>
              <SalesOrderCreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchases/orders"

          element={
            <PurchaseOrdersPage />
          }

        />

        <Route
          path="/purchases/orders/:id"
          element={
            <PurchaseOrderDetailPage />
          }
        />

        <Route
            path="/purchases/orders/:id/receive"
            element={
                <ProtectedRoute>
                    <PurchaseReceiptCreatePage />
                </ProtectedRoute>
            }
        />

      </Routes>

    </BrowserRouter>
  )
}