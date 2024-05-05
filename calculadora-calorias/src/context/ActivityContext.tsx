// importaciones necesarias
import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {

    // ReactNode permite cualquier tipo de hijos de React válidos
    children: ReactNode 
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

/**
 * createContext - Crea un contexto para el estado de las actividades.
 *
 * Este contexto proporcionará acceso a los datos del estado de las actividades,
 * así como a las funciones para modificar dicho estado a todos sus componentes descendientes.
 */

export const ActivityContext = createContext<ActivityContextProps>(null!)

/**
 * ActivityProvider - Proveedor del contexto para las actividades.
 *
 * Este componente encapsula la lógica de estado para las actividades utilizando un reducer.
 * Proporciona el estado y las funciones de dispatch a los componentes que consumen este contexto.
 *
 * @param {ActivityProviderProps} props - Propiedades pasadas al proveedor, incluyendo `children`.
 * @return {JSX.Element} Un proveedor de contexto que envuelve a los hijos con acceso al estado de actividades.
 */

export const ActivityProvider = ({children}: ActivityProviderProps) => {
    
    // Inicializa el estado y el dispatch usando el reducer y el estado inicial.
    const [state, dispatch] = useReducer(activityReducer, initialState)

    // Calcula las calorías consumidas sumando las calorías de las actividades de categoría 'Comida'.
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => 
        activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

    // Calcula las calorías quemadas sumando las calorías de las actividades de categoría 'Ejercicio'.
    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => 
        activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

    // Calcula las calorías netas como la diferencia entre las consumidas y las quemadas.
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [caloriesConsumed, caloriesBurned])
    
    // Devuelve el nombre de la categoría basado en su ID.
    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.find(cat => cat.id === category)?.name || '', [categories])

    // Verifica si la lista de actividades está vacía.
    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

    // Proveedor de contexto que envuelve a los hijos, proporcionándoles acceso al estado y las funciones de dispatch.
    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}
