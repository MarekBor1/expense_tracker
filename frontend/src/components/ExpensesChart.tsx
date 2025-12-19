import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartData } from '../types/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff6b6b'];

interface Props {
  data: ChartData[];
}

export const ExpensesChart = ({ data }: Props) => {
  return (
    <div style={{ 
      flex: 1, 
      background: '#333', 
      padding: '20px', 
      borderRadius: '10px', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <h3 style={{ textAlign: 'center', color: '#fff', margin: '0 0 20px 0' }}>Struktura Wydatków</h3>
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="Kwota"
              nameKey="Kategoria_System"
              cx="50%"
              cy="50%"
              innerRadius={60}    // Styl Donut
              outerRadius="80%"
              fill="#8884d8"
              label={({ name, percent }: any) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={{ stroke: '#fff' }} 
              style={{ outline: 'none' }}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)} PLN`} />
            <Legend wrapperStyle={{ color: '#fff', fontSize: '12px' }} layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};