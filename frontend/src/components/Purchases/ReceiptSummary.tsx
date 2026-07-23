import type { FC } from "react";

interface ReceiptSummaryProps {
    totalProducts: number;
    orderedQuantity: number;
    previouslyReceived: number;
    receivingNow: number;
    pendingQuantity: number;
}

interface SummaryCardProps {
    title: string;
    value: number;
    color: string;
}

const SummaryCard: FC<SummaryCardProps> = ({
    title,
    value,
    color,
}) => (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
            {title}
        </p>

        <p className={`mt-2 text-3xl font-bold ${color}`}>
            {value}
        </p>
    </div>
);

const ReceiptSummary: FC<ReceiptSummaryProps> = ({
    totalProducts,
    orderedQuantity,
    previouslyReceived,
    receivingNow,
    pendingQuantity,
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            <SummaryCard
                title="Productos"
                value={totalProducts}
                color="text-slate-700"
            />

            <SummaryCard
                title="Cantidad Pedida"
                value={orderedQuantity}
                color="text-blue-600"
            />

            <SummaryCard
                title="Recibido"
                value={previouslyReceived}
                color="text-green-600"
            />

            <SummaryCard
                title="Recibiendo"
                value={receivingNow}
                color="text-indigo-600"
            />

            <SummaryCard
                title="Pendiente"
                value={pendingQuantity}
                color="text-amber-600"
            />

        </div>
    );
};

export default ReceiptSummary;