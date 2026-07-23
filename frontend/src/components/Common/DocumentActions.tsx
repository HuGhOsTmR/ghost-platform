import React from "react";

import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export interface DocumentActionsProps {

    loading?: boolean;

    disableSave?: boolean;

    disableCancel?: boolean;

    saveLabel?: string;

    cancelLabel?: string;

    onSave: () => void;

    onCancel: () => void;

    children?: React.ReactNode;

}

const DocumentActions: React.FC<DocumentActionsProps> = ({
    loading = false,
    disableSave = false,
    disableCancel = false,
    saveLabel = "Guardar",
    cancelLabel = "Cancelar",
    onSave,
    onCancel,
    children,
}) => {

    return (

        <Box sx={{ mt: 3 }}>

            <Divider sx={{ mb: 2 }} />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >

                <Box>

                    {children}

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<CancelIcon />}
                        disabled={loading || disableCancel}
                        onClick={onCancel}
                    >

                        {cancelLabel}

                    </Button>

                    <Button
                        variant="contained"
                        startIcon={
                            loading
                                ? <CircularProgress size={18} color="inherit" />
                                : <SaveIcon />
                        }
                        disabled={loading || disableSave}
                        onClick={onSave}
                    >

                        {loading
                            ? "Procesando..."
                            : saveLabel}

                    </Button>

                </Stack>

            </Stack>

        </Box>

    );

};

export default DocumentActions;