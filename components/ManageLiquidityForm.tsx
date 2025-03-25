import { useState } from 'react';

export default function ManageLiquidityForm() {
  // State für Liquidity Pool-Verwaltung
  const [selectedPool, setSelectedPool] = useState('');
  const [baseAmount, setBaseAmount] = useState(0);
  const [quoteAmount, setQuoteAmount] = useState(0);
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(true);
  
  // State für Formular-Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Simulierte Liquidity Pool-Liste (in einer echten Anwendung würde dies aus der Wallet oder einer API kommen)
  const availablePools = [
    { address: 'pool1', name: 'TOKEN1/SOL' },
    { address: 'pool2', name: 'TOKEN2/USDC' },
    { address: 'pool3', name: 'TOKEN3/USDT' },
  ];
  
  // Handler für Formular-Übermittlung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Hier würde die tatsächliche Liquidity-Verwaltung erfolgen
      // Unter Verwendung des RaydiumService
      
      // Simuliere eine erfolgreiche Operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Formular zurücksetzen
      setBaseAmount(0);
      setQuoteAmount(0);
    } catch (err) {
      setError(`Fehler beim ${isAddingLiquidity ? 'Hinzufügen' : 'Entfernen'} von Liquidität. Bitte versuche es erneut.`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-solana-green">Liquidität verwalten</h1>
      
      {success ? (
        <div className="bg-green-800 text-white p-4 rounded-md mb-6">
          Liquidität wurde erfolgreich {isAddingLiquidity ? 'hinzugefügt' : 'entfernt'}!
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          {error}
        </div>
      ) : null}
      
      <div className="flex space-x-4 mb-6">
        <button
          className={`py-2 px-4 rounded-md ${isAddingLiquidity ? 'bg-light-blue text-white' : 'bg-dark-blue text-gray-300'}`}
          onClick={() => setIsAddingLiquidity(true)}
        >
          Liquidität hinzufügen
        </button>
        <button
          className={`py-2 px-4 rounded-md ${!isAddingLiquidity ? 'bg-light-blue text-white' : 'bg-dark-blue text-gray-300'}`}
          onClick={() => setIsAddingLiquidity(false)}
        >
          Liquidität entfernen
        </button>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 text-solana-purple">
          {isAddingLiquidity ? 'Liquidität hinzufügen' : 'Liquidität entfernen'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="liquidityPool" className="block text-sm font-medium text-gray-300 mb-2">Liquidity Pool:*</label>
            <select
              id="liquidityPool"
              className="input-field"
              required
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
            >
              <option value="">Wallet verbinden</option>
              {availablePools.map((pool) => (
                <option key={pool.address} value={pool.address}>
                  {pool.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Base Amount */}
            <div>
              <label htmlFor="baseAmount" className="block text-sm font-medium text-gray-300 mb-2">
                {isAddingLiquidity ? 'Base Menge' : 'Base Menge zum Entfernen'}
              </label>
              <input
                type="number"
                id="baseAmount"
                placeholder={isAddingLiquidity ? "Base Menge" : "Base Menge zum Entfernen"}
                min={0}
                step={0.000001}
                className="input-field"
                required
                value={baseAmount || ''}
                onChange={(e) => setBaseAmount(parseFloat(e.target.value) || 0)}
              />
              <p className="text-sm text-gray-400 mt-1">Guthaben: 0 Base</p>
            </div>
            
            {/* Quote Amount */}
            <div>
              <label htmlFor="quoteAmount" className="block text-sm font-medium text-gray-300 mb-2">
                {isAddingLiquidity ? 'Quote Menge' : 'Quote Menge zum Entfernen'}
              </label>
              <input
                type="number"
                id="quoteAmount"
                placeholder={isAddingLiquidity ? "Quote Menge" : "Quote Menge zum Entfernen"}
                min={0}
                step={0.000001}
                className="input-field"
                required
                value={quoteAmount || ''}
                onChange={(e) => setQuoteAmount(parseFloat(e.target.value) || 0)}
              />
              <p className="text-sm text-gray-400 mt-1">Guthaben: 0 Quote</p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-300 mb-2">
              {isAddingLiquidity 
                ? `Hinzufügen zu Liquidity Pool: ${baseAmount || 0} Base + ${quoteAmount || 0} Quote` 
                : `Entfernen aus Liquidity Pool: ${baseAmount || 0} Base + ${quoteAmount || 0} Quote`}
            </p>
            <p className="text-gray-300 mb-2">Gesamtgebühren: 0.2 SOL</p>
          </div>
          
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="btn-primary py-3 px-8 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? `Liquidität wird ${isAddingLiquidity ? 'hinzugefügt' : 'entfernt'}...` 
                : `Liquidität ${isAddingLiquidity ? 'hinzufügen' : 'entfernen'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
