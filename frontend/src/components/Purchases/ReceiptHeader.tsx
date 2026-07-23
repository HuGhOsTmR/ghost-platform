import type { FC } from "react";

/**
 * Ajusta este tipo para que coincida con el tipo real
 * que utiliza tu proyecto.
 */
interface PurchaseOrderHeader {
    number: string;
    supplier_name: string;
    warehouse_name: string;
}

interface ReceiptHeaderProps {
    purchaseOrder: PurchaseOrderHeader;
    receiptDate: string;
    onReceiptDateChange: (value: string) => void;
}

const ReceiptHeader: FC<ReceiptHeaderProps> = ({
    purchaseOrder,
    receiptDate,
    onReceiptDateChange,
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Encabezado */}
            <div className="border-b border-gray-200 px-6 py-4">

                <h1 className="text-xl font-semibold text-gray-900">
                    Recepción de Compra
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Registre las cantidades recibidas de la orden de compra.
                </p>

            </div>

            {/* Datos */}
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

                {/* Orden */}
                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-500">
                        Orden de Compra
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-medium text-gray-900">
                        {purchaseOrder.number}
                    </div>

                </div>

                {/* Fecha */}
                <div>

                    <label
                        htmlFor="receiptDate"
                        className="mb-1 block text-sm font-medium text-gray-500"
                    >
                        Fecha de Recepción
                    </label>

                    <input
                        id="receiptDate"
                        type="date"
                        value={receiptDate}
                        onChange={(e) => onReceiptDateChange(e.target.value)}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-3
                            py-2
                            shadow-sm
                            focus:border-blue-500
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500/20
                        "
                    />

                </div>

                {/* Proveedor */}
                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-500">
                        Proveedor
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900">
                        {purchaseOrder.supplier_name}
                    </div>

                </div>

                {/* Almacén */}
                <div>

                    <label className="mb-1 block text-sm font-medium text-gray-500">
                        Almacén
                    </label>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900">
                        {purchaseOrder.warehouse_name}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReceiptHeader;