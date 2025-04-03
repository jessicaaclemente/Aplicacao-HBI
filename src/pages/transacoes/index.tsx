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
  const [bloquearDescricao, setBloquearDescricao] = useState(false);

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

    if (tipo === "saida") {
      const novaTransacao: Transacao = {
        id: transacoes.length + 1,
        data: new Date().toLocaleDateString(),
        valor: -valor,
        descricao: descricao,
      };

      const novasTransacoes = [novaTransacao, ...transacoes];
      setTransacoes(novasTransacoes);
      localStorage.setItem("transacoes", JSON.stringify(novasTransacoes));
    }

    setValorTransacao("");
    setDescricao("");
    setBloquearDescricao(tipo === "entrada");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20" style={{ backgroundColor: '#CDF3FF' }}>
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

      <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-96">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#000A65' }}>Transações Recentes</h2>

        {transacoes.length === 0 ? (
          <p className="text-gray-500 text-sm">Nenhuma transação encontrada.</p>
        ) : (
          <ul className="space-y-2">
            {transacoes.map((transacao) => (
              <li key={transacao.id} className="flex flex-col p-2 border-b">
                <span className="text-sm">{transacao.data} - {transacao.descricao}</span>
                <span className={`text-sm font-bold ${transacao.valor >= 0 ? "text-green-600" : "text-red-600"}`}>
                  R$ {transacao.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <input
          type="number"
          value={valorTransacao}
          onChange={(e) => setValorTransacao(e.target.value)}
          placeholder="Digite o valor"
          className="border border-gray-300 p-2 rounded-lg w-full text-center mt-4"
        />

        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição"
          className="border border-gray-300 p-2 rounded-lg w-full text-center mt-2"
          disabled={bloquearDescricao}
        />

        <div className="mt-4 flex flex-col gap-2">
          <button
            className="text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
            style={{ backgroundColor: '#000A65' }}
            onClick={() => atualizarSaldo("entrada")}
          >
            Adicionar
          </button>

          <button
            className="text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
            style={{ backgroundColor: '#E21414' }}
            onClick={() => atualizarSaldo("saida")}
          >
            Gerar nova transação
          </button>
        </div>
      </div>
    </div>
  );
}
