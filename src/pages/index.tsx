import Image from 'next/image';
import logoHBI from './assets/logoHBI.png';
import { Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import Button from './components/button';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import CustomInput from './components/input';
import { z } from 'zod';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700']
});

export default function Home() {

  const [password, setPassword] = useState('');
  const [CPF, setCPF] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const schema = z.object({
    CPF: z.string().min(11, 'Digite o CPF corretamente'),
    password: z.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .refine(val => /[A-Z]/.test(val), { message: 'Deve conter pelo menos uma letra maiúscula' })
      .refine(val => /[a-z]/.test(val), { message: 'Deve conter pelo menos uma letra minúscula' })
      .refine(val => /\d/.test(val), { message: 'Deve conter pelo menos um número' })
      .refine(val => /[^a-zA-Z0-9]/.test(val), { message: 'Deve conter pelo menos um caractere especial' }),
  });

  return (
    <main className={`${poppins.className} h-screen grid xl:grid-cols-2 sm:grid-cols-1`}>
      
      {/* Coluna da imagem e textos */}
      <div className="flex flex-col items-center justify-center bg-[#CDF3FF] px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key="logohbi"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={logoHBI}
              alt="Logo da empresa HBI"
              className="w-[190px] h-[80px] sm:w-[200px] sm:h-[90px] xl:w-[410px] xl:h-[190px] mx-auto"
              priority
            />

            <h1 className="text-xl sm:text-4xl mt-4 text-[#000A65] text-center">
              Bancarizar é o mínimo.
            </h1>
            <h1 className="text-xl sm:text-4xl text-[#000A65] text-center">
              Nós fazemos o <strong className="font-bold">máximo</strong>.
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Coluna do formulário de login */}
      <div className="flex items-center justify-center bg-[#CDF3FF] px-4 sm:px-2">
        <form className="bg-white p-8 rounded-lg shadow-md w-96 border border-[#14E2C3]">
          <h2 className="text-2xl mb-4 text-[#000A65]">Login</h2>

          <div className="mb-5">
            <CustomInput
              label="CPF"
              color="primary"
              focused
              value={CPF}
              mask="999.999.999-99"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCPF(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <CustomInput
              label="Senha"
              color="primary"
              focused
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center">
            <Button
              label='Entrar'
              onClick={() => {
                const result = schema.safeParse({ CPF, password });

                if (result.success) {
                  router.push('/transacoes');
                } else {
                  const errors = result.error.format();
                  alert("Verifique os dados preenchidos:\n" +
                    (errors.CPF?._errors?.[0] || '') + "\n" +
                    (errors.password?._errors?.[0] || '')
                  );
                }
              }}
            />
          </div>

        </form>
      </div>
    </main>
  );
}
