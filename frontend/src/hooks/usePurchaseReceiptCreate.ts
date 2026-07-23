import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import type {
    EditableReceiptLine,
    PurchaseOrderDetail,
    ReceiptSummary,
    ValidationResult,
    SnackbarState,
} from "../types";

import {
    mapPurchaseOrderToEditableReceiptLines,
    setReceiptQuantity,
    calculateReceiptSummary,
    validateReceipt,
    buildPurchaseReceiptPayload,
} from "../utils";

import { usePurchaseOrder } from "./usePurchaseOrder";
import { useCreatePurchaseReceipt } from "./useCreatePurchaseReceipt";



/* ============================================================
 * CONTROLLER
 * ============================================================ */

export interface PurchaseReceiptCreateController {

    data: {

        purchaseOrder?: PurchaseOrderDetail;

        receiptDate: string;

        lines: EditableReceiptLine[];

    };

    computed: {

        summary: ReceiptSummary;

        validation: ValidationResult;

        canSave: boolean;

    };

    state: {

        loading: boolean;

        saving: boolean;

        error: boolean;

    };

    actions: {

        setReceiptDate(
            value: string
        ): void;

        updateQuantity(
            purchaseOrderLine: number,
            quantity: number
        ): void;

        save(): Promise<void>;

        cancel(): boolean;

        closeSnackbar(): void;

    };

    ui: {

        snackbar: SnackbarState;

    };

}

/* ============================================================
 * HOOK
 * ============================================================ */

export function usePurchaseReceiptCreate(
    purchaseOrderId: string
): PurchaseReceiptCreateController {

    const purchaseOrder =
        usePurchaseOrder(purchaseOrderId);

    const mutation =
        useCreatePurchaseReceipt();

    const [receiptDate, setReceiptDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );

    const [lines, setLines] =
        useState<EditableReceiptLine[]>([]);

    const [snackbar, setSnackbar] =
        useState<SnackbarState>({
            open: false,
            severity: "success",
            message: "",
        });

    useEffect(() => {

        if (!purchaseOrder.data) return;

        setLines(

            mapPurchaseOrderToEditableReceiptLines(

                purchaseOrder.data

            )

        );

    }, [purchaseOrder.data]);

    const summary = useMemo(

        () =>

            calculateReceiptSummary(lines),

        [lines]

    );

    const validation = useMemo(

        () =>

            validateReceipt(lines),

        [lines]

    );

    const updateQuantity = useCallback(

        (
            purchaseOrderLine: number,
            quantity: number
        ) => {

            setLines(previous =>

                setReceiptQuantity(

                    previous,

                    purchaseOrderLine,

                    quantity

                )

            );

        },

        []

    );

    const closeSnackbar = useCallback(

        () =>

            setSnackbar(previous => ({

                ...previous,

                open: false,

            })),

        []

    );

    const cancel = useCallback(

        () =>

            !lines.some(

                line => line.quantityReceived > 0

            ),

        [lines]

    );

    const save = useCallback(

        async () => {

            if (!purchaseOrder.data) return;

            if (!validation.valid) {

                setSnackbar({

                    open: true,

                    severity: "warning",

                    message: validation.errors[0],

                });

                return;

            }

            try {

                const payload =

                    buildPurchaseReceiptPayload({

                        purchaseOrder:

                            purchaseOrder.data.id,

                        receiptDate,

                        notes: "",

                        lines,

                    });

                await mutation.mutateAsync(

                    payload

                );

                setSnackbar({

                    open: true,

                    severity: "success",

                    message:
                        "Recepción registrada correctamente.",

                });

            }

            catch {

                setSnackbar({

                    open: true,

                    severity: "error",

                    message:
                        "No fue posible registrar la recepción.",

                });

            }

        },

        [

            purchaseOrder.data,

            receiptDate,

            lines,

            validation,

            mutation,

        ]

    );

    return {

        data: {

            purchaseOrder:

                purchaseOrder.data,

            receiptDate,

            lines,

        },

        computed: {

            summary,

            validation,

            canSave:

                validation.valid,

        },

        state: {

            loading:

                purchaseOrder.isLoading,

            saving:

                mutation.isPending,

            error:

                purchaseOrder.isError,

        },

        actions: {

            setReceiptDate,

            updateQuantity,

            save,

            cancel,

            closeSnackbar,

        },

        ui: {

            snackbar,

        },

    };

}