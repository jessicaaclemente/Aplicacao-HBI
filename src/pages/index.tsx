import Image from 'next/image';
import logoHBI from './assets/logoHBI.png';
import { Poppins } from 'next/font/google';
import { useState, useEffect } from 'react';
import Button from './components/button';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomInput from './components/input';

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

  return (
    <main className={`${poppins.className} h-screen grid grid-cols-2`}>
      {/* Divide a main em duas colunas */}

      {/* Coluna da imagem e textos */}
      <div className="flex flex-col items-center justify-center" style={{ backgroundColor: '#CDF3FF' }}>
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
              width={400}
              height={400}
            />

            <h1 className="text-4xl mt-4" style={{ color: '#000A65' }}>Bancarizar é o mínimo.</h1>
            <h1 className="text-4xl" style={{ color: '#000A65' }}>
              Nós fazemos o <strong className="text-4xl font-bold" style={{ color: '#000A65' }}>máximo</strong>.
            </h1>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Coluna do formulário de login */}
      <div className="flex items-center justify-center" style={{ backgroundColor: '#CDF3FF' }}>
        <form className="bg-white p-8 rounded-lg shadow-md w-96 border" style={{ borderColor: '#14E2C3' }}>
          <h2 className="text-2xl mb-4" style={{ color: '#000A65' }}>Login</h2>

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
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

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
