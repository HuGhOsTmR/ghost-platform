import { useNavigate, useParams } from "react-router-dom";

import ReceiptHeader from "../components/Purchases/ReceiptHeader";
import ReceiptSummary from "../components/Purchases/ReceiptSummary";
import EditableReceiptLinesTable from "../components/Purchases/EditableReceiptLinesTable";
import DocumentActions from "../components/Purchases/DocumentActions";

import LoadingScreen from "../components/Common/LoadingScreen";
import ErrorScreen from "../components/Common/ErrorScreen";

import { usePurchaseReceiptCreate } from "../hooks/usePurchaseReceiptCreate";

const PurchaseReceiptCreatePage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    if (!id) {

        return (

            <ErrorScreen
                title="Orden no encontrada"
                message="No se proporcionó el identificador de la orden."
            />

        );

    }

    const controller = usePurchaseReceiptCreate(id);

    if (controller.state.loading) {

        return <LoadingScreen />;

    }

    if (controller.state.error) {

        return (

            <ErrorScreen
                title="Error"
                message={controller.state.error}
            />

        );

    }

    if (!controller.data.purchaseOrder) {

        return (

            <ErrorScreen
                title="Orden no encontrada"
                message="La orden solicitada no existe."
            />

        );

    }

    console.log(controller.computed.summary);
    
    return (

        <div className="max-w-7xl mx-auto p-6 space-y-6">

            <ReceiptHeader
                purchaseOrder={controller.data.purchaseOrder}
                receiptDate={controller.data.receiptDate}
                onReceiptDateChange={controller.actions.setReceiptDate}
            />

            <ReceiptSummary

                totalProducts={
                    controller.computed.summary.totalProducts
                }

                orderedQuantity={
                    controller.computed.summary.orderedQuantity
                }

                previouslyReceived={
                    controller.computed.summary.previouslyReceived
                }

                receivingNow={
                    controller.computed.summary.receivingNow
                }

                pendingQuantity={
                    controller.computed.summary.pendingQuantity
                }

            />

            <EditableReceiptLinesTable

                lines={
                    controller.data.lines
                }

                onQuantityChange={
                    controller.actions.updateQuantity
                }

            />

            <DocumentActions

                saving={
                    controller.state.saving
                }

                canSave={
                    controller.computed.canSave
                }

                onCancel={() => navigate(-1)}

                onSave={
                    controller.actions.save
                }

            />

        </div>

    );

};

export default PurchaseReceiptCreatePage;