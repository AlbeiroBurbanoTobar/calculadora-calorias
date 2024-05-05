import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

/**
 * useActivity - Hook personalizado para acceder al contexto de actividades.
 *
 * Este hook simplifica el acceso al contexto de actividades definido en `ActivityContext`.
 * Se debe usar dentro de componentes que están envueltos en el `ActivityProvider` para asegurar
 * que el contexto esté disponible. Si se intenta usar fuera del proveedor, lanzará un error.
 *
 * @return {ActivityContextProps} El objeto de contexto que proporciona acceso al estado y las funciones dispatch.
 * @throws {Error} Lanza un error si el hook se usa fuera de un `ActivityProvider`.
 */

export const useActivity = () => {
    const context = useContext(ActivityContext);

    // Verifica que el contexto no sea nulo, lo que indicaría que este hook está siendo usado fuera de un ActivityProvider.
    if (!context) {
        throw new Error('el hook useActivity debe ser utilizado en un ActivityProvider');
    }

    return context;
}
