import { useState, useEffect } from 'react';

// Lista kategorii zgodna z Twoim backendem
const CATEGORIES = ['Jedzenie', 'Transport', 'Subskrypcje', 'Rozrywka', 'Inne'];

export const BudgetPage = () => {
  // Stan dla formularza
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [amount, setAmount] = useState('');

  // Stan dla zapisanych celów (pobieramy z localStorage przy starcie)
  const [goals, setGoals] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('monthly_budget_goals');
    return saved ? JSON.parse(saved) : {};
  });

  // Funkcja zapisująca cel
  const handleSave = () => {
    if (!amount) return;
    
    const newGoals = { ...goals, [selectedCategory]: parseFloat(amount) };
    setGoals(newGoals);
    
    // Zapisujemy w przeglądarce na stałe
    localStorage.setItem('monthly_budget_goals', JSON.stringify(newGoals));
    setAmount(''); // Czyścimy pole
  };

  // Stylizacja (Ciemny motyw)
  const cardStyle = {
    background: '#333',
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #555',
    background: '#444',
    color: 'white',
    marginRight: '10px'
  };

  return (
    <div style={{ padding: '20px', width: 'calc(100vw - 40px)', margin: '0 auto' }}>
      <h2 style={{ color: 'white', textAlign: 'center' }}>🎯 Ustaw Cele Miesięczne</h2>

      {/* --- FORMULARZ --- */}
      <div style={{ ...cardStyle, flexDirection: 'column', gap: '15px', background: '#222', border: '1px solid #444' } as any}>
        <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
          
          {/* Wybór Kategorii */}
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={inputStyle}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Wpisanie Kwoty */}
          <input 
            type="number" 
            placeholder="Kwota (PLN)" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          <button 
            onClick={handleSave}
            style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Zapisz Cel
          </button>
        </div>
      </div>

      {/* --- LISTA CELÓW --- */}
      <h3 style={{ color: '#aaa', marginTop: '30px' }}>Twoje aktywne cele:</h3>
      
      {Object.keys(goals).length === 0 && <p style={{ color: '#666' }}>Nie ustawiłeś jeszcze żadnych celów.</p>}

      {Object.entries(goals).map(([cat, goalAmount]) => (
        <div key={cat} style={cardStyle}>
          <div>
            <strong style={{ fontSize: '18px', color: '#4da6ff' }}>{cat}</strong>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#82c91e' }}>
            {goalAmount.toFixed(2)} PLN
          </div>
        </div>
      ))}
    </div>
  );
};