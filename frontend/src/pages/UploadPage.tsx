import React from 'react';

interface Props {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  loading: boolean;
  error: string | null;
  startDate: string;
  endDate: string;
  setStartDate: (val: string) => void;
  setEndDate: (val: string) => void;
  fileSelected: boolean;
}

export const UploadPage = ({ onFileChange, onUpload, loading, error, fileSelected }: Props) => {
  

  return (
    <div style={{ width: '100vw', margin: '40px auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '30px' }}>Wgraj wyciąg z banku</h1>
      
      <div style={{ 
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
        gap: '15px', padding: '40px', background: '#333', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' ,
        width: '50%', margin: '0 auto',
      }}>
        <input type="file" accept=".csv" onChange={onFileChange} style={{ color: '#fff' }} />
        

        <div style={{ width: '100%', marginTop: '20px' }}>
          <button 
            onClick={onUpload} 
            disabled={!fileSelected || loading}
            style={{ 
              padding: '12px 40px', cursor: 'pointer',
              background: loading ? '#555' : '#28a745', color: 'white',
              border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold'
            }}
          >
            {loading ? 'Przetwarzanie...' : 'ANALIZUJ DANE 🚀'}
          </button>
        </div>
      </div>
      {error && <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};