import { useState } from 'react';
import axios from 'axios';
// Upewnij się, że ścieżka do typów jest poprawna:
import type { AnalysisResult } from './types/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Kolory do wykresu
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b'];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      // WAŻNE: Tu strzelamy do Twojego backendu w Pythonie
      const response = await axios.post<AnalysisResult>('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Błąd połączenia! Czy backend (uvicorn) jest włączony?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>💰 Mój Budget Tracker</h1>

      {/* SEKCJA UPLOADU */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        padding: '30px',
        background: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          style={{
            marginLeft: '10px',
            padding: '10px 25px',
            cursor: 'pointer',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        >
          {loading ? 'Przetwarzanie...' : 'Analizuj Wyciąg'}
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

      {/* WYNIKI - Wyświetlamy tylko jak mamy dane */}
      {data && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Wydano łącznie: <span style={{ color: '#d32f2f' }}>{data.total_spent.toFixed(2)} PLN</span></h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '30px' }}>

            {/* LEWA STRONA: WYKRES */}
            <div style={{ flex: 1, minWidth: '400px', height: '500px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ textAlign: 'center' }}>Gdzie uciekają pieniądze?</h3>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={data.chart_data}
                    dataKey="Kwota"
                    nameKey="Kategoria_System"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name, percent }: { name?: string | number; percent?: number }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
}
                  >
                    {data.chart_data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `${value.toFixed(2)} PLN`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* PRAWA STRONA: TABELA */}
            <div style={{ flex: 1, minWidth: '400px', overflowX: 'auto' }}>
              <h3>Ostatnie Transakcje</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#333', color: 'white', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Data</th>
                    <th style={{ padding: '12px' }}>Opis</th>
                    <th style={{ padding: '12px' }}>Kategoria</th>
                    <th style={{ padding: '12px' }}>Kwota</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transactions.slice(0, 15).map((t, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee', background: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                      <td style={{ padding: '10px' }}>{t['Data operacji']}</td>
                      <td style={{ padding: '10px' }}>{t['Opis operacji'].slice(0, 25)}...</td>
                      <td style={{ padding: '10px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          background: '#e0e0e0',
                          fontSize: '12px'
                        }}>
                          {t.Kategoria_System}
                        </span>
                      </td>
                      <td style={{ padding: '10px', color: t.Kwota < 0 ? '#d32f2f' : '#388e3c', fontWeight: 'bold' }}>
                        {t.Kwota} PLN
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
  );
}

export default App;