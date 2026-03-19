
import { toast } from 'sonner'
import { useConfig } from '../../context/config/useConfig'

function SymbolSection() {

  const { setCurrency, currency } = useConfig()
  const currencies = ["€", "$", "£", "S/.", "MXN"]


  return (
    <section className="bg-gray-800/50 border border-gray-700 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-yellow-500 font-bold text-xl w-6 text-center">
          {currency}
        </div>
        <div>
          <span className="font-bold block">Moneda local</span>
          <p className="text-[10px] text-gray-500 uppercase">
            Símbolo para cobros y reportes
          </p>
        </div>
      </div>

      <div className="flex justify-between bg-gray-900/50 p-2 rounded-2xl border border-gray-700">
        {currencies.map((symbol) => (
          <button
            key={symbol}
            onClick={() => {
              toast(`tu moneda ahora es ${symbol}`)
              setCurrency(symbol)
            }}
            className={`flex-1 py-2 rounded-xl transition-all font-bold ${currency === symbol
              ? "bg-gray-700 text-white shadow-lg"
              : "text-gray-500"
              }`}
          >
            {symbol}
          </button>
        ))}
      </div>
    </section>
  )
}

export default SymbolSection