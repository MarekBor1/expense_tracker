import type { AnalysisResult } from '../types/api';
import { ExpensesChart } from '../components/ExpensesChart';
import { TransactionTable } from '../components/TransactionTable';
import { DateFilters } from '../components/DateFilters'
import { useState, useMemo } from 'react';

interface Props {
  data: AnalysisResult | null;
  onBackToUpload: () => void;
}

export const DashboardPage = ({ data, onBackToUpload }: Props) => {

  const [startDate, setStartDate] = useState(''); // ADD default date later!!!
  const [endDate, setEndDate] = useState(''); // ADD default date later!!!

  const filteredTransactions = useMemo(() => {
    if (!data) return [];

    return data.transactions.filter(t => {
      const transactionDate = t['Data operacji'];
      if (startDate && transactionDate < startDate) return false;
      if (endDate && transactionDate > endDate) return false;
      return true;
    });
  }, [data, startDate, endDate]);  

  return (
    <div style={{ 
      padding: '20px', 
      height: 'calc(100vh - 80px)', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {!data ? (
        // Stan pusty
        <div style={{ display: 'flex', width: '100vw', textAlign: 'center', marginTop: '100px' }}>
            <div style={{ 
              
                background: '#333', 
                padding: '50px',              
                borderRadius: '15px',         
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)', 
                textAlign: 'center',          
                maxWidth: '600px',            
                width: '50%',
                margin: '0 auto',
            }}>
          <h2 style={{ color: '#aaa' }}>Brak danych do wyświetlenia 😔</h2>
          <button onClick={onBackToUpload} style={{ padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
            ⬅️ Wróć i wgraj plik
          </button>
        </div>
        </div>
      ) : (
        // Dashboard
        <div style={{ display: 'flex', flexDirection: 'column', height: '90%', width: 'calc(100vw - 60px)' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#fff' }}>
                Wydano łącznie: <span style={{ color: '#ff6b6b' }}>{data.total_spent.toFixed(2)} PLN</span>
              </h2>
          </div>

          <DateFilters 
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <div style={{ display: 'flex', flex: 1, gap: '20px', minHeight: 0 }}>
             <ExpensesChart data={data.chart_data} />
             <TransactionTable transactions={filteredTransactions} />
          </div>
        </div>
      )}
    </div>
  );
};