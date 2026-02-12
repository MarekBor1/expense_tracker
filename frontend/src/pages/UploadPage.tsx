import React, { useState } from 'react';
import { useExpenseUpload } from '../hooks/useExpenseUpload'; // <--- Twój nowy hook
import type { AnalysisResult } from '../types/api';

interface Props {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const UploadPage = ({ onAnalysisComplete }: Props) => {
  // 1. Lokalny stan pliku (tylko ten komponent musi o nim wiedzieć)
  const [file, setFile] = useState<File | null>(null);

  // 2. Użycie hooka do logiki
  const { upload, isLoading, error } = useExpenseUpload(onAnalysisComplete);

  // Obsługa wyboru pliku
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Obsługa kliknięcia "Analizuj"
  const handleUploadClick = () => {
    if (file) {
      upload(file);
    }
  };

  return (
    <div style={{ width: '100vw', margin: '40px auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>Wgraj wyciąg z banku</h1>
      
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
        gap: '15px', padding: '40px', background: '#333', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' ,
        width: '50%', margin: '0 auto',
      }}>
        {/* Input pliku */}
        <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange} 
            style={{ color: '#fff' }} 
        />
        
        <div style={{ width: '100%', marginTop: '20px' }}>
          <button 
            onClick={handleUploadClick} 
            disabled={!file || isLoading}
            style={{ 
              padding: '12px 40px', cursor: 'pointer',
              background: isLoading ? '#555' : '#28a745', color: 'white',
              border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold'
            }}
          >
            {isLoading ? 'Przetwarzanie...' : 'ANALIZUJ DANE 🚀'}
          </button>
        </div>
      </div>

      {/* Wyświetlanie błędu z Hooka */}
      {error && <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};