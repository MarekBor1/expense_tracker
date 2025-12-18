import React from 'react';

interface Props {
  activeTab: 'upload' | 'dashboard';
  setActiveTab: (tab: 'upload' | 'dashboard') => void;
}

export const NavigationBar = ({ activeTab, setActiveTab }: Props) => {
  const getTabStyle = (tabName: 'upload' | 'dashboard') => ({
    padding: '10px 20px',
    cursor: 'pointer',
    background: activeTab === tabName ? '#007bff' : 'transparent',
    color: activeTab === tabName ? '#fff' : '#aaa',
    border: 'none',
    borderBottom: activeTab === tabName ? '2px solid white' : '2px solid transparent',
    fontSize: '16px',
    fontWeight: 'bold',
    marginRight: '10px',
    borderRadius: '5px 5px 0 0'
  });

  return (
    <nav style={{ 
      background: '#333', 
      padding: '10px 20px', 
      display: 'flex', 
      alignItems: 'center', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      marginBottom: '0px' // Zmieniono na 0, żeby pasowało do layoutu full-screen
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
  );
};