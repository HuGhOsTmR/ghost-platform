export type SnackbarSeverity =
    | "success"
    | "error"
    | "warning"
    | "info";

export interface SnackbarState {

    open: boolean;

    message: string;

    severity: SnackbarSeverity;

}