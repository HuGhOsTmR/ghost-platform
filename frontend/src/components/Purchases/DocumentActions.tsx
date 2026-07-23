import type { FC } from "react";

interface DocumentActionsProps {
    saving: boolean;
    canSave: boolean;
    onSave: () => void;
    onCancel: () => void;
}

const DocumentActions: FC<DocumentActionsProps> = ({
    saving,
    canSave,
    onSave,
    onCancel,
}) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:justify-end">

            <button
                type="button"
                onClick={onCancel}
                className="
                    rounded-lg
                    border
                    border-gray-300
                    px-5
                    py-2.5
                    font-medium
                    text-gray-700
                    transition
                    hover:bg-gray-100
                "
            >
                Cancelar
            </button>

            <button
                type="button"
                onClick={onSave}
                disabled={!canSave || saving}
                className="
                    rounded-lg
                    bg-blue-600
                    px-5
                    py-2.5
                    font-medium
                    text-white
                    transition
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:bg-gray-400
                "
            >
                {saving ? "Guardando..." : "Guardar Recepción"}
            </button>

        </div>
    );
};

export default DocumentActions;