import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRoute from './ProtectedRoute'
import SalesOrdersPage
  from '../pages/SalesOrdersPage'

import SalesOrderDetailPage
  from '../pages/SalesOrderDetailPage'

import SalesOrderCreatePage
  from '../pages/SalesOrderCreatePage'

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
          path="/sales/orders/new"
          element={
            <ProtectedRoute>
              <SalesOrderCreatePage />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  )
}