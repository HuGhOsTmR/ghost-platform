import type {
    ChangeEvent,
    FC,
} from "react";

import type {
    EditableReceiptLine,
} from "../../types";

interface EditableReceiptLinesTableProps {

    lines: ReadonlyArray<EditableReceiptLine>;

    onQuantityChange(

        purchaseOrderLine: number,

        quantity: number,

    ): void;

}

const EditableReceiptLinesTable: FC<EditableReceiptLinesTableProps> = ({

    lines,

    onQuantityChange,

}) => {

    const handleChange = (

        purchaseOrderLine: number,

        event: ChangeEvent<HTMLInputElement>,

    ) => {

        const quantity = Number(event.target.value);

        onQuantityChange(

            purchaseOrderLine,

            Number.isNaN(quantity)
                ? 0
                : quantity,

        );

    };

    return (

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
                    border-b
                    border-gray-200
                    px-6
                    py-4
                "
            >

                <h2 className="text-lg font-semibold">

                    Productos

                </h2>

                <p className="text-sm text-gray-500 mt-1">

                    Registre la cantidad recibida para cada producto.

                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead
                        className="
                            bg-gray-50
                            border-b
                            border-gray-200
                        "
                    >

                        <tr>

                            <th className="px-4 py-3 text-left text-sm font-semibold">

                                Código

                            </th>

                            <th className="px-4 py-3 text-left text-sm font-semibold">

                                Producto

                            </th>

                            <th className="px-4 py-3 text-center text-sm font-semibold">

                                Unidad

                            </th>

                            <th className="px-4 py-3 text-center text-sm font-semibold">

                                Pedido

                            </th>

                            <th className="px-4 py-3 text-center text-sm font-semibold">

                                Recibido

                            </th>

                            <th className="px-4 py-3 text-center text-sm font-semibold">

                                Pendiente

                            </th>

                            <th className="px-4 py-3 text-center text-sm font-semibold">

                                Recibir

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            lines.map(line => (

                                <tr

                                    key={line.purchaseOrderLine}

                                    className="
                                        border-b
                                        border-gray-100
                                        hover:bg-gray-50
                                    "

                                >

                                    <td className="px-4 py-3">

                                        {line.productCode}

                                    </td>

                                    <td className="px-4 py-3">

                                        <div className="font-medium">

                                            {line.productName}

                                        </div>

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        {line.unitOfMeasure}

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        {line.orderedQuantity}

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        {line.previouslyReceived}

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <span
                                            className="
                                                font-semibold
                                                text-amber-600
                                            "
                                        >

                                            {line.pendingQuantity}

                                        </span>

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <input

                                            type="number"

                                            min={0}

                                            max={line.pendingQuantity}

                                            value={line.quantityReceived}

                                            onChange={(event) =>

                                                handleChange(

                                                    line.purchaseOrderLine,

                                                    event,

                                                )

                                            }

                                            className="
                                                w-24
                                                rounded-lg
                                                border
                                                border-gray-300
                                                px-2
                                                py-1
                                                text-center
                                                focus:outline-none
                                                focus:ring-2
                                                focus:ring-blue-500/20
                                                focus:border-blue-500
                                            "

                                        />

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default EditableReceiptLinesTable;