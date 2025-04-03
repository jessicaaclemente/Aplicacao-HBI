import { useState } from "react";
import axios from "axios";

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

export default function EmpresaInfo() {
  const [cnpj, setCnpj] = useState<string>("");
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const buscarEmpresa = async () => {
    if (cnpj.length !== 14) {
      alert("Digite um CNPJ válido com 14 dígitos.");
      return;
    }

    setLoading(true);
    setError(null);
    setEmpresa(null);

    try {
      const response = await axios.get(`https://www.receitaws.com.br/v1/cnpj/04849745000180`);
      setEmpresa(response.data);
    } catch (err) {
      console.log(err);
      setError("Erro ao buscar os dados da empresa.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Consulta de Empresa</h1>
      <input
        type="text"
        placeholder="Digite o CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
        className="border p-2 rounded-lg mb-2 w-64 text-center"
      />
      <button
        onClick={buscarEmpresa}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Buscar Empresa
      </button>

      {loading && <p className="mt-4">Carregando...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {empresa && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-96">
          <h2 className="text-lg font-semibold mb-2">{empresa.nome}</h2>
          <p className="text-sm text-gray-600">{empresa.fantasia || "Sem nome fantasia"}</p>
          <h3 className="text-md font-semibold mt-4">Endereço:</h3>
          <p>{empresa.logradouro}, {empresa.numero} - {empresa.bairro}</p>
          <p>{empresa.municipio} - {empresa.uf}, {empresa.cep}</p>
          <h3 className="text-md font-semibold mt-4">Contato:</h3>
          <p>Telefone: {empresa.telefone || "Não informado"}</p>
          <p>Email: {empresa.email || "Não informado"}</p>
          <h3 className="text-md font-semibold mt-4">Sócios:</h3>
          <ul className="list-disc ml-4">
            {empresa.qsa?.map((socio, index) => (
              <li key={index}>{socio.nome} - {socio.qual}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
