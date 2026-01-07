import type { Transaction } from '../types/api';

interface Props {
  transactions: Transaction[];
}
export const TransactionTable = ({ transactions }: Props) => {

  return (
    <div style={{ 
      flex: 1, 
      background: '#333', 
      padding: '20px', 
      borderRadius: '10px', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <h3 style={{ textAlign: 'center', color: '#fff', margin: '0 0 20px 0' }}>Historia Transakcji</h3>
      
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '5px', fontWeight: 'bold', color: '#fff' }}>Od:</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '5px', fontWeight: 'bold', color: '#fff' }}>Do:</label>
        </div>



      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#fff' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#333', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
            <tr style={{ textAlign: 'left', color: '#aaa' }}>
              <th style={{ padding: '15px' }}>Data</th>
              <th style={{ padding: '15px' }}>Opis</th>
              <th style={{ padding: '15px' }}>Kategoria</th>
              <th style={{ padding: '15px', textAlign: 'right' }}>Kwota</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>{t['Data operacji']}</td>
                <td style={{ padding: '12px', color: '#ccc' }}>{t['Opis operacji'].slice(0, 25)}...</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: '15px', background: '#444', fontSize: '11px', border: '1px solid #555' }}>
                    {t.Kategoria_System}
                  </span>
                </td>
                <td style={{ padding: '12px', color: t.Kwota < 0 ? '#ff6b6b' : '#4cd137', fontWeight: 'bold', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {t.Kwota} zł
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};