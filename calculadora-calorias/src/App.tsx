// importaciones necesarias
import { useEffect, useMemo } from 'react'
import Form from "./components/Form"
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'
import { useActivity } from './hooks/useActivity'

/**
 * App - Componente principal de la aplicación de contador de calorías.
 *
 * Este componente coordina la visualización de varios subcomponentes que manejan la entrada de datos,
 * el listado de actividades, y el seguimiento de calorías. Además, gestiona la persistencia de estos datos
 * en localStorage y proporciona la funcionalidad de reiniciar la aplicación.
 *
 * @return {JSX.Element} La interfaz de usuario de la aplicación completa.
 */
function App() {
    const { state, dispatch } = useActivity();

    // Efecto para guardar las actividades en localStorage cuando estas cambian.
    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities));
    }, [state.activities]);

    // Memoiza un valor booleano que indica si hay actividades para permitir el reinicio de la aplicación.
    const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities]);
    
    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Contador de Calorías
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        disabled={!canRestartApp}
                        onClick={() => dispatch({type: 'restart-app'})}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form />
                </div>
            </section>

            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker />
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList />
            </section>

            <footer className="bg-black py-5 text-center">
                <p className="font-bold text-white">Creado por Albeiro Burbano - Encuéntrame en:</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="https://www.freelancer.com/u/Albeiro73?sb=t" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-200">Freelancer</a>
                    <a href="http://www.linkedin.com/in/albeiro-jose-burbano-tobar-759ba4297" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-200">LinkedIn</a>
                    <a href="https://github.com/AlbeiroBurbanoTobar/ppi_pl_BurbanoA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-200">GitHub</a>
                    <a href="https://stackoverflow.com/users/24090991/albeiro-burbano" target="_blank" rel="noopener noreferrer" className="text-white hover:text-teal-200">Stack Overflow</a>
                </div>
            </footer>
        </>
    )
}

export default App
