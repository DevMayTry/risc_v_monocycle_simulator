"use client";
import { useRouter } from '../../node_modules/next/navigation';
import logo from '../assets/unioeste.png'

export default function Home() {
  const router = useRouter();

  const navigateToSimulatorPage = () => {
    router.push('/simulator');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 pb-16 bg-white">
        <img src={logo.src}  className="h-[180px] w-[350px]" alt="logo" />

        <div>
          <h1 className="text-center text-2xl font-bold"> Organização e Arquitetura de Computadores</h1>
          <p className="text-center text-xl">Simulador de Arquitetura RiscV Monociclo</p>
        </div>

        <div>
          <h2 className="text-center text-xl font-bold">Professora:</h2>
          <p className="text-center">Camile Frazao Bordini</p>
        </div>

        <div>
          <h2 className="text-center text-xl font-bold">Alunos:</h2>
          <p className="text-center">Daniel Zonta Ojeda</p>
          <p className="text-center">Deivid Márlon Fernandes da Costa</p>

        </div>

        <button 
          type={"button"} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          onClick={navigateToSimulatorPage}
        > Abrir Simulador</button>
    </main>
  );
}
