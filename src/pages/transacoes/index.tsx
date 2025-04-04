import { useState, useEffect } from "react";
import Button from '../components/button';
import { useRouter } from 'next/router';

interface Transacao {
  id: number;
  data: string;
  valor: number;
  descricao: string;
}

export default function Transacoes() {
  const usuario = { id: 1, nome: "Jéssica", idade: 18 };
  const [saldo, setSaldo] = useState(0);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [valorTransacao, setValorTransacao] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modo, setModo] = useState<"" | "entrada" | "saida">("");

  const router = useRouter();

  useEffect(() => {
    const saldoSalvo = localStorage.getItem("saldo");
    const transacoesSalvas = localStorage.getItem("transacoes");

    if (saldoSalvo === null) {
      localStorage.setItem("saldo", "0");
    } else {
      setSaldo(parseFloat(saldoSalvo));
    }

    if (transacoesSalvas) {
      setTransacoes(JSON.parse(transacoesSalvas));
    }
  }, []);

  const atualizarSaldo = (tipo: "entrada" | "saida") => {
    const valor = parseFloat(valorTransacao);

    if (isNaN(valor) || valor <= 0 || (tipo === "saida" && descricao.trim() === "")) {
      alert("Digite um valor válido e, se for uma saída, uma descrição!");
      return;
    }

    const novoSaldo = tipo === "entrada" ? saldo + valor : saldo - valor;
    setSaldo(novoSaldo);
    localStorage.setItem("saldo", novoSaldo.toString());

    const novaTransacao: Transacao = {
      id: transacoes.length + 1,
      data: new Date().toLocaleDateString(),
      valor: tipo === "entrada" ? valor : -valor,
      descricao: tipo === "entrada" ? "" : descricao
    };

    const novasTransacoes = [novaTransacao, ...transacoes];
    setTransacoes(novasTransacoes);
    localStorage.setItem("transacoes", JSON.stringify(novasTransacoes));

    setValorTransacao("");
    setDescricao("");
    setModo("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20" style={{ backgroundColor: '#CDF3FF' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full text-white p-4 z-10 shadow-md flex items-center justify-between" style={{ backgroundColor: '#000A65' }}>
        <div>
          <h1 className="text-xl font-bold">{`Olá, ${usuario.nome}`}</h1>
          <p className="text-lg">Saldo: R$ {saldo.toFixed(2)}</p>
        </div>

        <div>
          <Button
            label='Dados da Empresa'
            onClick={() => router.push('/dados-empresa')}
          />
        </div>
      </nav>

      {/* Layout Responsivo */}
      <div className="flex flex-col md:flex-row gap-6 mt-20 w-full max-w-5xl">
        
        {/* Seção de Realizar Transações */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 md:h-1/2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#000A65' }}>Realizar transações</h2>

          {modo && (
            <input
              type="number"
              value={valorTransacao}
              onChange={(e) => setValorTransacao(e.target.value)}
              placeholder="Digite o valor"
              className="border border-gray-300 p-2 rounded-lg w-full text-center mt-4"
              style={{ color: '#000A65' }}
            />
          )}

          {modo === "saida" && (
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
              className="border border-gray-300 p-2 rounded-lg w-full text-center mt-2"
              style={{ color: '#000A65' }}
            />
          )}

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
              style={{ backgroundColor: '#000A65' }}
              onClick={() => {
                if (modo === "entrada") {
                  atualizarSaldo("entrada");
                } else {
                  setModo("entrada");
                }
              }}
            >
              Adicionar
            </button>

            <button
              className="text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              style={{ backgroundColor: '#E21414' }}
              onClick={() => {
                if (modo === "saida") {
                  atualizarSaldo("saida");
                } else {
                  setModo("saida");
                }
              }}
            >
              Gerar nova transação
            </button>
          </div>
        </div>

        {/* Seção de Transações Recentes */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#000A65' }}>Transações Recentes</h2>

          {transacoes.length === 0 ? (
            <p className="text-gray-500 text-sm">Nenhuma transação encontrada.</p>
          ) : (
            <ul className="space-y-2">
              {transacoes.map((transacao) => (
                <li key={transacao.id} className="flex flex-col p-2 border-b border-gray-300">
                  <span className="text-sm">
                    {transacao.data}{" "}
                    {transacao.descricao && `- ${transacao.descricao}`}
                  </span>
                  <span
                    className={`text-sm font-bold ${transacao.valor >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    R$ {transacao.valor.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
