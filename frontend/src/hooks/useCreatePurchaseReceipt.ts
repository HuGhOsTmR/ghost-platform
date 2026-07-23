import {

    useMutation

} from "@tanstack/react-query";

import {

    createPurchaseReceipt

} from "../services/purchase.service";

export function useCreatePurchaseReceipt() {

    return useMutation({

        mutationFn: createPurchaseReceipt,

    });

}