import { useState } from 'react';
import axios from 'axios';
import type { AnalysisResult } from './types/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b'];

function App() {
  // --- STANY APLIKACJI ---
  const [activeTab, setActiveTab] = useState<'upload' | 'dashboard'>('upload');
  
  const [file, setFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIKA ---
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
      // Po udanym wgraniu, automatycznie przenieś na dashboard!
      setActiveTab('dashboard');
    } catch (err) {
      console.error(err);
      setError('Błąd połączenia! Czy backend (uvicorn) jest włączony?');
    } finally {
      setLoading(false);
    }
  };

  // Style pomocnicze
  const dateInputStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginLeft: '10px'
  };

  // Styl przycisku nawigacji (zakładki)
  const getTabStyle = (tabName: 'upload' | 'dashboard') => ({
    padding: '10px 20px',
    cursor: 'pointer',
    background: activeTab === tabName ? '#007bff' : 'transparent', // Aktywna = niebieska
    color: activeTab === tabName ? '#fff' : '#aaa',
    border: 'none',
    borderBottom: activeTab === tabName ? '2px solid white' : '2px solid transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '10px',
    borderRadius: '5px 5px 0 0'
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'Arial, sans-serif', background: '#222', color: '#fff' }}>
      
      {/* 1. PASEK NAWIGACJI (MENU) */}
      <nav style={{ 
        background: '#333', 
        padding: '10px 20px', 
        display: 'flex', 
        alignItems: 'center', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, marginRight: '40px', color: '#fff' }}>💰 Budget Tracker</h2>
        
        <div>
          <button onClick={() => setActiveTab('upload')} style={getTabStyle('upload')}>
            📥 Wgraj Plik
          </button>
          <button onClick={() => setActiveTab('dashboard')} style={getTabStyle('dashboard')}>
            📊 Wykresy i Dane
          </button>
        </div>
      </nav>


      {/* GŁÓWNA TREŚĆ - ZALEŻNA OD ZAKŁADKI */}
      <div style={{ padding: '20px' }}>
        
        {/* --- ZAKŁADKA 1: UPLOAD --- */}
        {activeTab === 'upload' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '30px' }}>Wgraj wyciąg z banku</h1>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px', 
              padding: '40px', 
              background: '#333', 
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)' 
            }}>
              <input type="file" accept=".csv" onChange={handleFileChange} style={{ color: '#fff' }} />

              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '5px', fontWeight: 'bold', color: '#fff' }}>Od:</label>
                  <input type="date" style={dateInputStyle} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ marginRight: '5px', fontWeight: 'bold', color: '#fff' }}>Do:</label>
                  <input type="date" style={dateInputStyle} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
              </div>

              <div style={{ width: '100%', marginTop: '20px' }}>
                <button 
                  onClick={handleUpload} 
                  disabled={!file || loading}
                  style={{ 
                    padding: '12px 40px', 
                    cursor: 'pointer',
                    background: loading ? '#555' : '#28a745', // Zielony przycisk
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  {loading ? 'Przetwarzanie...' : 'ANALIZUJ DANE 🚀'}
                </button>
              </div>
            </div>

            {error && <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginTop: '20px' }}>{error}</p>}
          </div>
        )}


        {/* --- ZAKŁADKA 2: DASHBOARD (Wykresy) --- */}
        {activeTab === 'dashboard' && (
          <div>
            {/* SCENARIUSZ A: BRAK DANYCH */}
            {!data && (
              <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2 style={{ color: '#aaa', marginBottom: '20px' }}>Brak danych do wyświetlenia 😔</h2>
                <p style={{ color: '#888', marginBottom: '30px' }}>Musisz najpierw wgrać plik CSV, aby zobaczyć wykresy.</p>
                <button 
                  onClick={() => setActiveTab('upload')} // Przekierowanie do zakładki Upload
                  style={{
                    padding: '15px 30px',
                    fontSize: '16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  ⬅️ Wróć i wgraj plik
                </button>
              </div>
            )}

            {/* SCENARIUSZ B: SĄ DANE */}
            {data && (
              <div>
                <h2 style={{ textAlign: 'center', color: '#fff' }}>Wydano łącznie: <span style={{ color: '#ff6b6b' }}>{data.total_spent.toFixed(2)} PLN</span></h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
                  
                  {/* WYKRES */}
                  <div style={{ flex: 1, minWidth: '500px', height: '600px', background: '#333', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                    <h3 style={{ textAlign: 'center', color: '#fff' }}>Struktura Wydatków</h3>
                    <ResponsiveContainer width="100%" height="90%">
                      <PieChart>
                        <Pie
                          data={data.chart_data}
                          dataKey="Kwota"
                          nameKey="Kategoria_System"
                          cx="50%"
                          cy="50%"
                          outerRadius={200}
                          fill="#8884d8"
                          label={({ name, percent }: { name?: string | number; percent?: number }) => 
                              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                          }
                          labelLine={{ stroke: '#fff' }} 
                          style={{ fill: '#fff', fontSize: '14px' }}
                        >
                          {data.chart_data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number | string) => `${Number(value).toFixed(2)} PLN`} />
                        <Legend wrapperStyle={{ color: '#fff' }}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* TABELA */}
                  <div style={{ flex: 1, minWidth: '500px', background: '#333', borderRadius: '10px', overflowX: 'auto', maxHeight: '600px', overflowY: 'auto' }}>
                    <h3 style={{ textAlign: 'center', color: '#fff' }}>Historia Transakcji</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#fff' }}>
                      <thead style={{ position: 'sticky', top: 0, background: '#333', zIndex: 1 }}>
                        <tr style={{ color: 'white', textAlign: 'left' }}>
                          <th style={{ padding: '15px' }}>Data</th>
                          <th style={{ padding: '15px' }}>Opis</th>
                          <th style={{ padding: '15px' }}>Kategoria</th>
                          <th style={{ padding: '15px' }}>Kwota</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.transactions.slice(0, 50).map((t, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #444' }}>
                            <td style={{ padding: '12px' }}>{t['Data operacji']}</td>
                            <td style={{ padding: '12px', color: '#ccc' }}>{t['Opis operacji'].slice(0, 30)}...</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ 
                                padding: '4px 10px', 
                                borderRadius: '15px', 
                                background: '#444', 
                                fontSize: '11px',
                                color: '#fff',
                                border: '1px solid #555'
                              }}>
                                {t.Kategoria_System}
                              </span>
                            </td>
                            <td style={{ padding: '12px', color: t.Kwota < 0 ? '#ff6b6b' : '#4cd137', fontWeight: 'bold', textAlign: 'right' }}>
                              {t.Kwota} zł
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;