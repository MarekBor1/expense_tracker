
interface Props {
    startDate: string;
    endDate: string;
    setStartDate: (val: string) => void;
    setEndDate: (val: string) => void;
}

export const DateFilters = ({ startDate, endDate, setStartDate, setEndDate }: Props) => {
    const dateInputStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginLeft: '10px' };

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', padding: '10px', background: '#333', borderRadius: '10px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '5px', fontWeight: 'bold' }}>Od:</label>
            <input type="date" style={dateInputStyle} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '5px', fontWeight: 'bold' }}>Do:</label>
            <input type="date" style={dateInputStyle} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
        </div>
    </div>
  );
};