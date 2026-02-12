import { useState } from 'react';
import type { AnalysisResult } from './types/api';

import { NavigationBar } from './components/NavigationBar';
import { UploadPage } from './pages/UploadPage';
import { DashboardPage } from './pages/DashboardPage';
import { BudgetPage } from './pages/BudgetPage'; 

function App() {
  // --- 1. STAN GLOBALNY ---
  // App trzyma tylko to, co jest potrzebne w wielu miejscach:
  // - Jaka strona jest otwarta?
  // - Jakie dane mamy z banku?
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard' | 'budget'>('upload');
  const [data, setData] = useState<AnalysisResult | null>(null);

  // --- 2. LOGIKA STERUJĄCA ---
  
  // Ta funkcja zostanie wywołana przez UploadPage, gdy API zwróci sukces.
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setData(result);       // Zapisujemy dane globalnie
    setActiveTab('dashboard'); // Przenosimy użytkownika na wykresy
  };

  const handleLogout = () => {
    setData(null);
    setActiveTab('upload');
  };

  // --- 3. WIDOK ---
  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'Arial, sans-serif', background: '#222', color: '#fff' }}>
      
      {/* Pasek nawigacji - zawsze widoczny */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* --- ROUTING (Przełączanie stron) --- */}

      {activeTab === 'upload' && (
        <UploadPage 
          onAnalysisComplete={handleAnalysisComplete} 
        />
      )}

      {activeTab === 'dashboard' && (
        <DashboardPage 
          data={data} 
          onBackToUpload={handleLogout} 
        />
      )}

      {activeTab === 'budget' && (
        <BudgetPage />
      )}

    </div>
  );
}

export default App;