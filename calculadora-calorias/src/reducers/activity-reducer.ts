// importacion necesaria
import { Activity } from "../types"

/**
 * Define los tipos de acciones que pueden ser despachadas para actualizar el estado de las actividades.
 */
export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity: Activity } } | 
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app' };

/**
 * Define la estructura del estado para el manejo de actividades.
 */
export type ActivityState = {

     // Lista de actividades
    activities: Activity[],

    // ID de la actividad activa para edición
    activeId: Activity['id'] 
};

/**
 * Recupera las actividades almacenadas en localStorage si existen.
 * @return {Activity[]} Un array de actividades.
 */

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities');
    return activities ? JSON.parse(activities) : [];
}

/**
 * Estado inicial para el reducer de actividades.
 */
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
};

/**
 * Reducer para manejar las acciones relacionadas con las actividades.
 *
 * @param {ActivityState} state Estado actual de las actividades.
 * @param {ActivityActions} action Acción a procesar para actualizar el estado.
 * @return {ActivityState} Nuevo estado resultante de aplicar la acción.
 */
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {
    switch (action.type) {
        case 'save-activity': {
            let updatedActivities: Activity[] = [];
            if (state.activeId) {

                // Actualiza una actividad existente.
                updatedActivities = state.activities.map(activity =>
                    activity.id === state.activeId ? action.payload.newActivity : activity
                );
            } else {

                // Agrega una nueva actividad a la lista.
                updatedActivities = [...state.activities, action.payload.newActivity];
            }
            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            };
        }
        case 'set-activeId':

            // Establece el ID de la actividad activa para edición.
            return {
                ...state,
                activeId: action.payload.id
            };
        case 'delete-activity':

            // Elimina una actividad de la lista.
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.id)
            };
        case 'restart-app':

            // Reinicia el estado de la aplicación.
            return {
                activities: [],
                activeId: ''
            };
        default:
            
            // Devuelve el estado actual si el tipo de acción no es manejado.
            return state;
    }
};
