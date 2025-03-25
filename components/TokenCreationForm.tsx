import { useState } from 'react';
import { TokenMetadata, SocialLinks } from '../src/metadataService';

export default function TokenCreationForm() {
  // State für Token-Metadaten
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(9);
  const [tokenSupply, setTokenSupply] = useState(1000000000);
  const [tokenDescription, setTokenDescription] = useState('');
  
  // State für Social-Media-Links
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  
  // State für Bild-Upload
  const [tokenImage, setTokenImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // State für Formular-Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Handler für Bild-Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTokenImage(file);
      
      // Erstelle eine Vorschau des Bildes
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handler für Formular-Übermittlung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Hier würde die tatsächliche Token-Erstellung erfolgen
      // Unter Verwendung der Services, die wir erstellt haben
      
      // Simuliere eine erfolgreiche Token-Erstellung
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Formular zurücksetzen
      setTokenName('');
      setTokenSymbol('');
      setTokenDecimals(9);
      setTokenSupply(1000000000);
      setTokenDescription('');
      setWebsite('');
      setTwitter('');
      setTelegram('');
      setTokenImage(null);
      setImagePreview(null);
    } catch (err) {
      setError('Fehler bei der Token-Erstellung. Bitte versuche es erneut.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-solana-green">Solana Token erstellen</h1>
      
      {success ? (
        <div className="bg-green-800 text-white p-4 rounded-md mb-6">
          Token wurde erfolgreich erstellt! Du kannst jetzt einen Liquidity Pool hinzufügen.
        </div>
      ) : null}
      
      {error ? (
        <div className="bg-red-800 text-white p-4 rounded-md mb-6">
          {error}
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linke Spalte - Token-Bild und Social-Media-Links */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-solana-purple">Token-Bild</h2>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center mb-4 overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Token Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">Bild hochladen</span>
                  )}
                </div>
                <label className="btn-primary cursor-pointer">
                  Bild auswählen
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="text-sm text-gray-400 mt-2">Empfohlen: 1000x1000 Pixel</p>
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-semibold mb-4 text-solana-purple">Social-Media-Links</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-300">Website</label>
                  <input
                    type="url"
                    id="website"
                    placeholder="https://deine-website.com"
                    className="input-field"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-300">Twitter</label>
                  <input
                    type="url"
                    id="twitter"
                    placeholder="https://twitter.com/dein-account"
                    className="input-field"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="telegram" className="block text-sm font-medium text-gray-300">Telegram</label>
                  <input
                    type="url"
                    id="telegram"
                    placeholder="https://t.me/dein-kanal"
                    className="input-field"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Rechte Spalte - Token-Details */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 text-solana-purple">Token-Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="tokenName" className="block text-sm font-medium text-gray-300">Name *</label>
                <input
                  type="text"
                  id="tokenName"
                  placeholder="Token Name"
                  className="input-field"
                  required
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="tokenSymbol" className="block text-sm font-medium text-gray-300">Symbol *</label>
                <input
                  type="text"
                  id="tokenSymbol"
                  placeholder="TOKEN"
                  className="input-field"
                  required
                  maxLength={10}
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                />
              </div>
              
              <div>
                <label htmlFor="tokenDecimals" className="block text-sm font-medium text-gray-300">Dezimalstellen *</label>
                <input
                  type="number"
                  id="tokenDecimals"
                  min={0}
                  max={18}
                  className="input-field"
                  required
                  value={tokenDecimals}
                  onChange={(e) => setTokenDecimals(parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-400 mt-1">Die meisten Meme-Coins verwenden 9 Dezimalstellen</p>
              </div>
              
              <div>
                <label htmlFor="tokenSupply" className="block text-sm font-medium text-gray-300">Versorgung *</label>
                <input
                  type="number"
                  id="tokenSupply"
                  min={1}
                  className="input-field"
                  required
                  value={tokenSupply}
                  onChange={(e) => setTokenSupply(parseInt(e.target.value))}
                />
                <p className="text-sm text-gray-400 mt-1">Die meisten Meme-Coins verwenden 1 Milliarde (1.000.000.000)</p>
              </div>
              
              <div>
                <label htmlFor="tokenDescription" className="block text-sm font-medium text-gray-300">Beschreibung *</label>
                <textarea
                  id="tokenDescription"
                  rows={4}
                  className="input-field"
                  required
                  value={tokenDescription}
                  onChange={(e) => setTokenDescription(e.target.value)}
                ></textarea>
              </div>
              
              <div className="pt-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-solana-purple" />
                  <span className="text-sm text-gray-300">Autorität nach der Erstellung widerrufen (Revoke)</span>
                </label>
                <p className="text-sm text-gray-400 mt-1">Dies macht das Token unveränderlich und verhindert, dass jemand mehr Token prägen kann</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="btn-primary py-3 px-8 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Token wird erstellt...' : 'Token erstellen'}
          </button>
        </div>
      </form>
    </div>
  );
}
