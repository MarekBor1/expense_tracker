import type { AnalysisResult } from '../types/api';
import { ExpensesChart } from '../components/ExpensesChart';
import { TransactionTable } from '../components/TransactionTable';

interface Props {
  data: AnalysisResult | null;
  onBackToUpload: () => void;
}

export const DashboardPage = ({ data, onBackToUpload }: Props) => {
  return (
    <div style={{ 
      padding: '20px', 
      height: 'calc(100vh - 80px)', // Full screen minus navbar
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {!data ? (
        // Stan pusty
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <h2 style={{ color: '#aaa' }}>Brak danych do wyświetlenia 😔</h2>
          <button onClick={onBackToUpload} style={{ padding: '15px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
            ⬅️ Wróć i wgraj plik
          </button>
        </div>
      ) : (
        // Dashboard z danymi
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#fff' }}>
                Wydano łącznie: <span style={{ color: '#ff6b6b' }}>{data.total_spent.toFixed(2)} PLN</span>
              </h2>
          </div>

          <div style={{ display: 'flex', flex: 1, gap: '20px', minHeight: 0 }}>
             <ExpensesChart data={data.chart_data} />
             <TransactionTable transactions={data.transactions} />
          </div>
        </div>
      )}
    </div>
  );
};