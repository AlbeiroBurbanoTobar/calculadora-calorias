// importaciones necesarios
import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

/**
 * CalorieTracker - Componente para mostrar el resumen de calorías.
 *
 * Este componente recoge y muestra un resumen de las calorías consumidas, quemadas y la diferencia neta
 * mediante el uso del componente CalorieDisplay para cada tipo de dato.
 *
 * Utiliza el hook personalizado `useActivity` para acceder a los datos del contexto global de actividades.
 *
 * @return Elemento JSX que muestra el resumen de calorías en diferentes categorías.
 */

export default function CalorieTracker() {
    // Extracción de datos de calorías del contexto global mediante el hook useActivity.
    const { caloriesConsumed, caloriesBurned, netCalories } = useActivity()
    
    return (
        <>
            {/* Título del componente */}
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorías</h2>

            {/* Contenedores para mostrar calorías consumidas, quemadas y la diferencia neta */}
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                
                {/* Calorías consumidas */}
                <CalorieDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                {/* Calorías quemadas */}
                <CalorieDisplay
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                {/* Diferencia neta de calorías */}
                <CalorieDisplay
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
