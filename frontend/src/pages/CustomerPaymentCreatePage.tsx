import {
  useState,
  useEffect
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import AppLayout
  from '../layouts/AppLayout'

import GhostSearchSelect
  from '../components/Common/GhostSearchSelect'

import {
  useCustomers
} from '../hooks/useCustomers'

import {
  useCurrencies
} from '../hooks/useCurrencies'

import {
  useBankAccounts
} from '../hooks/useBankAccounts'

import {
  useAccountsReceivableByCustomer
} from '../hooks/useAccountsReceivableByCustomer'

import {
  useCreateCustomerPayment
} from '../hooks/useCreateCustomerPayment'

export default function CustomerPaymentCreatePage() {

  const navigate =
    useNavigate()

  const {
    data: customers = []
  } = useCustomers()

  const {
    data: currencies = []
  } = useCurrencies()

  const {
    data: bankAccounts = []
  } = useBankAccounts()

  const createPayment =
    useCreateCustomerPayment()

  const [header, setHeader] =
    useState({

      customer: 0,

      currency: 0,

      bank_account: 0,

      payment_date:
        new Date()
          .toISOString()
          .split('T')[0],

      reference: '',

      notes: ''

    })

  const [allocations, setAllocations] =
    useState<any[]>([])

  const {
    data: receivables = [],
    isLoading: loadingReceivables
  } =
    useAccountsReceivableByCustomer(
      header.customer || undefined
    )

  useEffect(() => {

    setAllocations([])

  }, [
    header.customer
  ])

  const customerOptions =

    customers.map(
      (customer: any) => ({

        value:
          customer.id,

        label:
          customer.name

      })
    )

  const totalApplied =

    allocations.reduce(

      (
        total,
        allocation
      ) =>

        total +

        Number(
          allocation.amount || 0
        ),

      0

    )

  const selectedInvoices =

    allocations.filter(

      allocation =>

        Number(
          allocation.amount
        ) > 0

    ).length

  const getAppliedAmount =
    (
      receivableId: number
    ) => {

      const allocation =

        allocations.find(

          item =>

            item.accounts_receivable ===
            receivableId

        )

      return allocation
        ? allocation.amount
        : ''

    }

  const updateAllocation =
    (
      receivable: any,
      amount: number
    ) => {

      const balance =

        Number(
          receivable.balance_amount
        )

      if (
        amount > balance
      ) {

        return

      }

      setAllocations(

        previous => {

          const others =

            previous.filter(

              item =>

                item.accounts_receivable !==
                receivable.id

            )

          if (
            amount <= 0
          ) {

            return others

          }

          return [

            ...others,

            {

              accounts_receivable:
                receivable.id,

              amount

            }

          ]

        }

      )

    }

  const applyFullBalance =
    (
      receivable: any
    ) => {

      updateAllocation(

        receivable,

        Number(
          receivable.balance_amount
        )

      )

    }

  const savePayment =
    async () => {

      if (
        !header.customer
      ) {

        alert(
          'Seleccione un cliente'
        )

        return

      }

      if (
        !header.currency
      ) {

        alert(
          'Seleccione una moneda'
        )

        return

      }

      if (
        !header.bank_account
      ) {

        alert(
          'Seleccione una cuenta bancaria'
        )

        return

      }

      if (
        allocations.length === 0
      ) {

        alert(
          'Debe aplicar al menos una factura'
        )

        return

      }

      if (
        totalApplied <= 0
      ) {

        alert(
          'El importe aplicado debe ser mayor a cero'
        )

        return

      }

      const payload = {

        customer:
          header.customer,

        currency:
          header.currency,

        bank_account:
          header.bank_account,

        payment_date:
          header.payment_date,

        amount:
          totalApplied,

        reference:
          header.reference,

        notes:
          header.notes,

        allocations

      }

      try {

        await createPayment
          .mutateAsync(
            payload
          )

        alert(
          'Cobro registrado correctamente'
        )

        navigate(
          '/finance/customer-payments'
        )

      }

      catch (
        error
      ) {

        console.error(
          error
        )

        alert(
          'Error al registrar cobro'
        )

      }

    }

  return (

    <AppLayout>

      <div
        className="
          space-y-6
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
          "
        >

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Nuevo Cobro
          </h1>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            p-6
            shadow-sm
          "
        >

          <h2
            className="
              text-lg
              font-semibold
              mb-4
            "
          >
            Información General
          </h2>

          <div
            className="
              grid
              grid-cols-2
              gap-6
            "
          >

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Cliente
              </label>

              <GhostSearchSelect

                options={
                  customerOptions
                }

                value={

                  customerOptions.find(

                    (option: any) =>

                      option.value ===
                      header.customer

                  ) || null

                }

                placeholder="Buscar cliente..."

                onChange={(selected) =>

                  setHeader({

                    ...header,

                    customer:
                      selected?.value || 0

                  })

                }

              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Fecha
              </label>

              <input

                type="date"

                value={
                  header.payment_date
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    payment_date:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Moneda
              </label>

              <select

                value={
                  header.currency
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    currency:
                      Number(
                        e.target.value
                      )

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              >

                <option value={0}>
                  Seleccione...
                </option>

                {
                  currencies.map(
                    (
                      currency: any
                    ) => (

                      <option
                        key={currency.id}
                        value={currency.id}
                      >

                        {currency.code}
                        {' - '}
                        {currency.name}

                      </option>

                    )
                  )
                }

              </select>

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Cuenta Bancaria
              </label>

              <select

                value={
                  header.bank_account
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    bank_account:
                      Number(
                        e.target.value
                      )

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              >

                <option value={0}>
                  Seleccione...
                </option>

                {
                  bankAccounts.map(
                    (
                      bank: any
                    ) => (

                      <option
                        key={bank.id}
                        value={bank.id}
                      >

                        {bank.code}
                        {' - '}
                        {bank.name}

                      </option>

                    )
                  )
                }

              </select>

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Referencia
              </label>

              <input

                value={
                  header.reference
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    reference:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            </div>

            <div>

              <label
                className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
              >
                Notas
              </label>

              <input

                value={
                  header.notes
                }

                onChange={(e) =>

                  setHeader({

                    ...header,

                    notes:
                      e.target.value

                  })

                }

                className="
                  w-full
                  border
                  rounded-lg
                  p-2
                "
              />

            </div>

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-xl
            border
            border-gray-200
            shadow-sm
            overflow-hidden
          "
        >

          <div
            className="
              p-6
              border-b
            "
          >

            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Cuentas por Cobrar
            </h2>

          </div>

          <table
            className="
              w-full
            "
          >

            <thead>

              <tr
                className="
                  bg-gray-50
                "
              >

                <th className="p-3 text-left">
                  Documento
                </th>

                <th className="p-3 text-right">
                  Original
                </th>

                <th className="p-3 text-right">
                  Pagado
                </th>

                <th className="p-3 text-right">
                  Saldo
                </th>

                <th className="p-3 text-right">
                  Aplicar
                </th>

                <th className="p-3 text-center">
                  Acción
                </th>

              </tr>

            </thead>

            <tbody>

              {
                loadingReceivables

                  ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="
                          p-6
                          text-center
                        "
                      >

                        Cargando...

                      </td>

                    </tr>

                  )

                  : receivables.map(
                      (
                        receivable: any
                      ) => (

                        <tr
                          key={
                            receivable.id
                          }
                          className="
                            border-t
                          "
                        >

                          <td className="p-3">

                            {
                              receivable.document_number
                            }

                          </td>

                          <td className="p-3 text-right">

                            {
                              receivable.original_amount
                            }

                          </td>

                          <td className="p-3 text-right">

                            {
                              receivable.paid_amount
                            }

                          </td>

                          <td className="p-3 text-right font-semibold">

                            {
                              receivable.balance_amount
                            }

                          </td>

                          <td className="p-3">

                            <input

                              type="number"

                              min="0"

                              max={
                                receivable.balance_amount
                              }

                              step="0.01"

                              value={

                                getAppliedAmount(
                                  receivable.id
                                )

                              }

                              onChange={(e) =>

                                updateAllocation(

                                  receivable,

                                  Number(
                                    e.target.value
                                  )

                                )

                              }

                              className="
                                w-28
                                border
                                rounded
                                p-2
                                text-right
                              "
                            />

                          </td>

                          <td className="p-3 text-center">

                            <button

                              onClick={() =>

                                applyFullBalance(
                                  receivable
                                )

                              }

                              className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-3
                                py-1
                                rounded
                                text-sm
                              "
                            >

                              Aplicar Todo

                            </button>

                          </td>

                        </tr>

                      )
                    )
              }

            </tbody>

          </table>

        </div>

        <div
          className="
            bg-gray-50
            rounded-xl
            border
            border-gray-200
            p-6
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <div>

              Facturas Seleccionadas:

              <strong>
                {' '}
                {selectedInvoices}
              </strong>

            </div>

            <div
              className="
                text-xl
                font-bold
              "
            >

              Total Aplicado:

              Bs {totalApplied.toFixed(2)}

            </div>

          </div>

        </div>

        <div
          className="
            flex
            justify-between
          "
        >

          <button

            onClick={() =>

              navigate(
                '/finance/customer-payments'
              )

            }

            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-6
              py-3
              rounded-lg
            "
          >

            Cancelar

          </button>

          <button

            onClick={
              savePayment
            }

            disabled={
              createPayment.isPending
            }

            className="
              bg-green-600
              hover:bg-green-700
              disabled:bg-gray-400
              text-white
              px-6
              py-3
              rounded-lg
              font-medium
            "
          >

            {

              createPayment.isPending

                ? 'Guardando...'

                : 'Guardar Cobro'

            }

          </button>

        </div>

      </div>

    </AppLayout>

  )

}