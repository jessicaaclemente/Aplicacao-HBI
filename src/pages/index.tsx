import Image from 'next/image';
import logoHBI from './assets/logoHBI.png';
import { Poppins } from 'next/font/google';
import InputMask from "react-input-mask";
import { useEffect } from 'react';
import Button from './components/button';
import { useRouter } from 'next/router';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700']
});

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className={`${poppins.className} h-screen grid grid-cols-2`}>

      {/* Coluna da imagem e textos */}
      <div className="flex flex-col items-center justify-center" style={{ backgroundColor: '#CDF3FF' }}>
        <Image
          src={logoHBI}
          alt="Logo da empresa HBI"
          width={400}
          height={400}
        />
        <h1 className="text-4xl mt-4" style={{ color: '#000A65' }}>Bancarizar é o mínimo.</h1>
        <h1 className="text-4xl" style={{ color: '#000A65' }}>
          Nós fazemos o <strong className="text-4xl font-bold" style={{ color: '#000A65' }}>máximo</strong>.
        </h1>
      </div>

      {/* Coluna do formulário de login */}
      <div className="flex items-center justify-center" style={{ backgroundColor: '#CDF3FF' }}>
        <form className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl text-gray-900 mb-4" style={{ color: '#000A65' }}>Login</h2>
          <InputMask
            mask="999.999.999-99"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            placeholder="CPF"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <div className="flex items-center justify-center">
            <Button label='Entrar' onClick={() => {
              router.push('/transacoes');
            }} />
          </div>

        </form>
      </div>
    </main>
  );
}
