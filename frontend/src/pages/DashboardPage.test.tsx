import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import '@testing-library/jest-dom';

// Mock child components to isolate DashboardPage logic
jest.mock('../components/ExpensesChart', () => ({
  ExpensesChart: () => <div data-testid="expenses-chart">Chart Component</div>
}));

jest.mock('../components/TransactionTable', () => ({
  TransactionTable: ({ transactions }: { transactions: any[] }) => (
    <div data-testid="transaction-table">
      Count: {transactions.length}
    </div>
  )
}));

jest.mock('../components/DateFilters', () => ({
  DateFilters: ({ setStartDate, setEndDate }: any) => (
    <div data-testid="date-filters">
      <button onClick={() => setStartDate('2023-01-01')}>Set Start Date</button>
      <button onClick={() => setEndDate('2023-01-31')}>Set End Date</button>
    </div>
  )
}));

const mockData: any = {
  transactions: [
    {
      "Data operacji": "2023-01-05",
      "Opis operacji": "Grocery",
      "Kategoria_System": "Food",
      "Kwota": -100.00
    },
    {
      "Data operacji": "2023-01-20",
      "Opis operacji": "Gas",
      "Kategoria_System": "Transport",
      "Kwota": -50.00
    },
    {
      "Data operacji": "2023-02-10",
      "Opis operacji": "Rent",
      "Kategoria_System": "Housing",
      "Kwota": -2000.00
    }
  ]
};

describe('DashboardPage', () => {
  test('renders empty state when data is null', () => {
    render(<DashboardPage data={null} onBackToUpload={jest.fn()} />);
    
    expect(screen.getByText(/Brak danych do wyświetlenia/i)).toBeInTheDocument();
    expect(screen.getByText(/Wróć i wgraj plik/i)).toBeInTheDocument();
  });

  test('calls onBackToUpload when back button is clicked', () => {
    const onBackMock = jest.fn();
    render(<DashboardPage data={null} onBackToUpload={onBackMock} />);
    
    fireEvent.click(screen.getByText(/Wróć i wgraj plik/i));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  test('renders dashboard content when data is provided', () => {
    render(<DashboardPage data={mockData} onBackToUpload={jest.fn()} />);

    expect(screen.queryByText(/Brak danych do wyświetlenia/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('expenses-chart')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
    expect(screen.getByTestId('date-filters')).toBeInTheDocument();
  });

  test('calculates and displays total amount correctly', () => {
    render(<DashboardPage data={mockData} onBackToUpload={jest.fn()} />);
    
    // Total = 100 + 50 + 2000 = 2150
    expect(screen.getByText(/Wydano łącznie/i)).toBeInTheDocument();
    expect(screen.getByText('2150.00 PLN')).toBeInTheDocument();
  });

  test('filters transactions and updates total when dates change', () => {
    render(<DashboardPage data={mockData} onBackToUpload={jest.fn()} />);

    // Simulate setting date filters via the mocked component
    fireEvent.click(screen.getByText('Set Start Date')); // 2023-01-01
    fireEvent.click(screen.getByText('Set End Date'));   // 2023-01-31

    // Should only include Grocery (100) and Gas (50) = 150. Rent (2000) is in Feb.
    expect(screen.getByText(/Wydano w wybranym okresie/i)).toBeInTheDocument();
    expect(screen.getByText('150.00 PLN')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-table')).toHaveTextContent('Count: 2');
  });
});