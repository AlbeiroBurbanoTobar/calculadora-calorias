type CalorieDisplayProps = {

  // Número de calorías a mostrar.
  calories: number,
  
  // Texto descriptivo para acompañar el número de calorías.
  text: string       
}

/**
* CalorieDisplay - Componente para mostrar las calorías de forma estilizada.
*
* Este componente visualiza el número de calorías y un texto descriptivo asociado.
* Es utilizado dentro de otros componentes como parte de resúmenes o dashboards de calorías.
*
* @param {CalorieDisplayProps} props - Propiedades del componente que incluyen:
*   - calories (number): Cantidad de calorías a mostrar.
*   - text (string): Texto descriptivo que acompaña al número de calorías.
* @return Elemento JSX que muestra las calorías y el texto descriptivo.
*/

export default function CalorieDisplay({calories, text}: CalorieDisplayProps) {
return (
  <p className="text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center">

      {/* Muestra el número de calorías con un gran tamaño de fuente y color distintivo */}
      <span className="font-black text-6xl text-orange">{calories}</span>

      {/* Muestra el texto descriptivo */}
      {text}  
  </p>
)
}
