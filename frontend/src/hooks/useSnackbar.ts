import {
    useCallback,
    useState,
} from "react";

import {
    SnackbarSeverity,
    SnackbarState,
} from "../types/ui";

export interface UseSnackbarReturn {

    state: SnackbarState;

    success(
        message: string
    ): void;

    error(
        message: string
    ): void;

    warning(
        message: string
    ): void;

    info(
        message: string
    ): void;

    show(
        message: string,
        severity: SnackbarSeverity
    ): void;

    close(): void;

}

export function useSnackbar(): UseSnackbarReturn {

    const [state, setState] =
        useState<SnackbarState>({

            open: false,

            message: "",

            severity: "info",

        });

    const show = useCallback(

        (
            message: string,
            severity: SnackbarSeverity
        ) => {

            setState({

                open: true,

                message,

                severity,

            });

        },

        []

    );

    const success = useCallback(

        (message: string) => {

            show(message, "success");

        },

        [show]

    );

    const error = useCallback(

        (message: string) => {

            show(message, "error");

        },

        [show]

    );

    const warning = useCallback(

        (message: string) => {

            show(message, "warning");

        },

        [show]

    );

    const info = useCallback(

        (message: string) => {

            show(message, "info");

        },

        [show]

    );

    const close = useCallback(

        () => {

            setState(previous => ({

                ...previous,

                open: false,

            }));

        },

        []

    );

    return {

        state,

        success,

        error,

        warning,

        info,

        show,

        close,

    };

}