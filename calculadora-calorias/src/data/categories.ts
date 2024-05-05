import type { Category } from "../types"

/**
 * categories - Array de objetos `Category`.
 *
 * Define las categorías disponibles para clasificar las actividades en la aplicación.
 * Cada categoría tiene un identificador único y un nombre que describe el tipo de actividad.
 *
 * Ejemplos de categorías incluyen:
 *  - Comida: Actividades relacionadas con el consumo de alimentos.
 *  - Ejercicio: Actividades relacionadas con el ejercicio físico.
 *
 * @type {Category[]} - Array de objetos `Category`.
 */
export const categories: Category[] = [
    { id: 1, name: 'Comida'},    // Categoría para actividades relacionadas con la comida.
    { id: 2, name: 'Ejercicio'}  // Categoría para actividades relacionadas con el ejercicio.
]
