import { useState } from 'react';
import axios from 'axios';
import type { AnalysisResult } from './types/api';

import { NavigationBar } from './components/NavigationBar';
import { UploadPage } from './pages/UploadPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  // --- STANY ---
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard'>('upload');
  
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIKA BIZNESOWA ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    if (startDate) formData.append('start_date', startDate);
    if (endDate) formData.append('end_date', endDate);

    try {
      const response = await axios.post<AnalysisResult>('http://127.0.0.1:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data);
      setActiveTab('dashboard'); // Automatyczne przejście
    } catch (err) {
      console.error(err);
      setError('Błąd połączenia! Czy backend działa?');
    } finally {
      setLoading(false);
    }
  };

  // --- WIDOK ---
  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'Arial, sans-serif', background: '#222', color: '#fff' }}>
      
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'upload' && (
        <UploadPage 
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          loading={loading}
          error={error}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          fileSelected={!!file}
        />
      )}

      {activeTab === 'dashboard' && (
        <DashboardPage 
          data={data} 
          onBackToUpload={() => setActiveTab('upload')} 
        />
      )}

    </div>
  );
}

export default App;