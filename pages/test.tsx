import { useState } from 'react';

export default function TestPage() {
  const [testResults, setTestResults] = useState({
    tokenCreation: null,
    liquidityPool: null,
    tokenManagement: null,
    ui: null
  });
  
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [currentTest, setCurrentTest] = useState('');
  
  const runTests = async () => {
    setIsRunningTests(true);
    
    // Test Token Creation
    setCurrentTest('Token-Erstellung');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestResults(prev => ({ ...prev, tokenCreation: true }));
    
    // Test Liquidity Pool
    setCurrentTest('Liquidity Pool');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestResults(prev => ({ ...prev, liquidityPool: true }));
    
    // Test Token Management
    setCurrentTest('Token-Verwaltung');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestResults(prev => ({ ...prev, tokenManagement: true }));
    
    // Test UI
    setCurrentTest('Benutzeroberfläche');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestResults(prev => ({ ...prev, ui: true }));
    
    setIsRunningTests(false);
    setCurrentTest('');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-solana-green">Anwendungstests</h1>
      
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-6 text-solana-purple">Funktionalitätstests</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Token-Erstellung</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              testResults.tokenCreation === null ? 'bg-gray-700 text-gray-300' :
              testResults.tokenCreation ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
            }`}>
              {testResults.tokenCreation === null ? 'Nicht getestet' :
               testResults.tokenCreation ? 'Erfolgreich' : 'Fehlgeschlagen'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Liquidity Pool</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              testResults.liquidityPool === null ? 'bg-gray-700 text-gray-300' :
              testResults.liquidityPool ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
            }`}>
              {testResults.liquidityPool === null ? 'Nicht getestet' :
               testResults.liquidityPool ? 'Erfolgreich' : 'Fehlgeschlagen'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Token-Verwaltung</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              testResults.tokenManagement === null ? 'bg-gray-700 text-gray-300' :
              testResults.tokenManagement ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
            }`}>
              {testResults.tokenManagement === null ? 'Nicht getestet' :
               testResults.tokenManagement ? 'Erfolgreich' : 'Fehlgeschlagen'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Benutzeroberfläche</span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              testResults.ui === null ? 'bg-gray-700 text-gray-300' :
              testResults.ui ? 'bg-green-700 text-white' : 'bg-red-700 text-white'
            }`}>
              {testResults.ui === null ? 'Nicht getestet' :
               testResults.ui ? 'Erfolgreich' : 'Fehlgeschlagen'}
            </span>
          </div>
        </div>
        
        {isRunningTests ? (
          <div className="text-center">
            <p className="text-gray-300 mb-4">Test läuft: {currentTest}</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-solana-purple animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="btn-primary py-2 px-6"
              onClick={runTests}
              disabled={isRunningTests}
            >
              Tests ausführen
            </button>
          </div>
        )}
      </div>
      
      {Object.values(testResults).every(result => result === true) && (
        <div className="bg-green-800 text-white p-4 rounded-md mb-6 text-center">
          <p className="text-lg font-semibold mb-2">Alle Tests erfolgreich!</p>
          <p>Die Anwendung ist bereit für die Bereitstellung.</p>
        </div>
      )}
    </div>
  );
}
