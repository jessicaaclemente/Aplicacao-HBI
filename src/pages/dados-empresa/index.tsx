import { useState, useEffect } from "react";
import axios from "axios";
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import hbiimagem from '../assets/hbiimagem.png';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/button';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700']
});

interface Empresa {
  nome: string;
  fantasia?: string;
  logradouro: string;
  numero: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  telefone?: string;
  email?: string;
  qsa?: { nome: string; qual: string }[];
}

export default function DadosEmpresa() {
  const [cnpj, setCnpj] = useState<string>("");
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCnpj("");
    setEmpresa(null);
    setError(null);
    setLoading(false);
  }, []);

  const buscarEmpresa = async () => {
    if (cnpj.length !== 14) {
      alert("Digite um CNPJ válido com 14 dígitos.");
      return;
    }

    setLoading(true);
    setError(null);
    setEmpresa(null);

    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj/${cnpj}`
      );
      setEmpresa(response.data);
    } catch (err) {
      console.log(err);
      setError("Erro ao buscar os dados da empresa.");
    }

    setLoading(false);
  };

  return (
    <main className={`${poppins.className} h-screen grid grid-cols-1 lg:grid-cols-2`} style={{ backgroundColor: '#CDF3FF', color: '#000A65' }}>

      {/* Lado Esquerdo */}
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Consultar Empresas</h1>
        <h2 className="text-center text-lg mb-6">Consulte dados de sua aplicação abaixo:</h2>
        <input
          type="text"
          placeholder="Digite o CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
          className="border p-3 rounded-lg mb-3 w-72 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="px-6 py-2 rounded-lg">
          <Button label='Buscar Empresa' onClick={buscarEmpresa} />
        </div>

        {loading && <p className="mt-4 text-blue-700">Carregando...</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>

      {/* Lado Direito com animação */}
      <div className="flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {empresa ? (
            <motion.div
              key="empresa"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{empresa.nome}</h2>
              <p className="text-gray-600 mb-4">{empresa.fantasia || "Sem nome fantasia"}</p>

              <h3 className="font-semibold text-md mt-4">Endereço:</h3>
              <p>{empresa.logradouro}, {empresa.numero} - {empresa.bairro}</p>
              <p>{empresa.municipio} - {empresa.uf}, {empresa.cep}</p>

              <h3 className="font-semibold text-md mt-4">Contato:</h3>
              <p>Telefone: {empresa.telefone || "Não informado"}</p>
              <p>Email: {empresa.email || "Não informado"}</p>

              <h3 className="font-semibold text-md mt-4">Sócios:</h3>
              <ul className="list-disc ml-5 mt-1">
                {empresa.qsa?.map((socio, index) => (
                  <li key={index}>{socio.nome} - {socio.qual}</li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={hbiimagem}
                alt="Logo da empresa HBI"
                width={400}
                height={400}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
