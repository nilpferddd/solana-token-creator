import { useState } from 'react';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // In einer echten Anwendung würde hier die Wallet-Verbindung hergestellt werden
    setWalletConnected(!walletConnected);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar walletConnected={walletConnected} onConnectWallet={handleConnectWallet} />
      <main className="py-8">
        <Component {...pageProps} walletConnected={walletConnected} />
      </main>
      <footer className="bg-dark-blue py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SolanaTokenCreator. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MyApp;
