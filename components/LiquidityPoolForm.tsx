import { useState } from 'react';

export default function LiquidityPoolForm() {
  // State für Liquidity Pool-Erstellung
  const [baseToken, setBaseToken] = useState('');
  const [quoteToken, setQuoteToken] = useState('');
  const [baseAmount, setBaseAmount] = useState(1);
  const [quoteAmount, setQuoteAmount] = useState(1);
  const [launchDate, setLaunchDate] = useState('');
  
  // State für Formular-Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Simulierte Token-Liste (in einer echten Anwendung würde dies aus der Wallet oder einer API kommen)
  const availableTokens = [
    { address: 'token1', name: 'Token 1' },
    { address: 'token2', name: 'Token 2' },
    { address: 'token3', name: 'Token 3' },
  ];
  
  // Handler für Formular-Übermittlung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Hier würde die tatsächliche Liquidity Pool-Erstellung erfolgen
      // Unter Verwendung des RaydiumService
      
      // Simuliere eine erfolgreiche Liquidity Pool-Erstellung
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Formular zurücksetzen
      setBaseAmount(1);
      setQuoteAmount(1);
      setLaunchDate('');
    } catch (err) {
      setError('Fehler bei der Liquidity Pool-Erstellung. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-solana-green">Solana Liquidity Pool erstellen</h1>
      
      {success ? (
        <div className="bg-green-800 text-white p-4 rounded-md mb-6">
          Liquidity Pool wurde erfolgreich erstellt!
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          {error}
        </div>
      ) : null}
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 text-solana-purple">Liquidity Pool erstellen</h2>
        <p className="mb-6 text-gray-300">Erstelle einen Liquidity Pool mit Raydium V3 CPMM Programm</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Base Token */}
            <div>
              <label htmlFor="baseToken" className="block text-sm font-medium text-gray-300 mb-2">Base Token*</label>
              <select
                id="baseToken"
                className="input-field"
                required
                value={baseToken}
                onChange={(e) => setBaseToken(e.target.value)}
              >
                <option value="">Wallet verbinden</option>
                {availableTokens.map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Quote Token */}
            <div>
              <label htmlFor="quoteToken" className="block text-sm font-medium text-gray-300 mb-2">Quote Token*</label>
              <select
                id="quoteToken"
                className="input-field"
                required
                value={quoteToken}
                onChange={(e) => setQuoteToken(e.target.value)}
              >
                <option value="">Wallet verbinden</option>
                {availableTokens.map((token) => (
                  <option key={token.address} value={token.address}>
                    {token.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Base Amount */}
            <div>
              <label htmlFor="baseAmount" className="block text-sm font-medium text-gray-300 mb-2">Base Menge</label>
              <input
                type="number"
                id="baseAmount"
                min={0.000001}
                step={0.000001}
                className="input-field"
                required
                value={baseAmount}
                onChange={(e) => setBaseAmount(parseFloat(e.target.value))}
              />
              <p className="text-sm text-gray-400 mt-1">Guthaben: 0</p>
            </div>
            
            {/* Quote Amount */}
            <div>
              <label htmlFor="quoteAmount" className="block text-sm font-medium text-gray-300 mb-2">Quote Menge</label>
              <input
                type="number"
                id="quoteAmount"
                min={0.000001}
                step={0.000001}
                className="input-field"
                required
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(parseFloat(e.target.value))}
              />
              <p className="text-sm text-gray-400 mt-1">Guthaben: 0</p>
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="launchDate" className="block text-sm font-medium text-gray-300 mb-2">Start-Datum festlegen</label>
            <input
              type="datetime-local"
              id="launchDate"
              className="input-field"
              value={launchDate}
              onChange={(e) => setLaunchDate(e.target.value)}
            />
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300 mb-2">Start-Preis: 0.00 Base/Quote</p>
            <p className="text-gray-300 mb-2">Hinzufügen zu Liquidity Pool: 0 Base + 0 Quote</p>
            <p className="text-gray-300 mb-2">Gesamtgebühren: 0.2 SOL</p>
          </div>
          
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="btn-primary py-3 px-8 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Liquidity Pool wird erstellt...' : 'Liquidity Pool erstellen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
