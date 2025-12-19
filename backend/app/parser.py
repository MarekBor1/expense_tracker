import pandas as pd
import io

def parse_mbank_csv(file_content: bytes):
    """
    Funkcja przyjmuje bajty pliku CSV i zwraca listę transakcji oraz podsumowanie.
    """
    try:
        # mBank ma metadane w pierwszych ~26 liniach. 
        # index_col=False jest KLUCZOWE, żeby nie zjadło daty jako indeksu.
        df = pd.read_csv(io.BytesIO(file_content), sep=';', skiprows=26, encoding='utf-8', index_col=False)
    except:
        # Fallback dla Windowsa (czasem kodowanie jest inne)
        df = pd.read_csv(io.BytesIO(file_content), sep=';', skiprows=26, encoding='windows-1250', index_col=False)

    # 1. Czyszczenie nazw kolumn (usuwamy # i spacje)
    df.columns = [c.replace('#', '').strip() for c in df.columns]
    
    # Wybieramy tylko to, co nas interesuje
    # Uwaga: w Twoim pliku kolumny to 'Data operacji', 'Opis operacji', 'Rachunek', 'Kategoria', 'Kwota'
    df = df[['Data operacji', 'Opis operacji', 'Rachunek', 'Kategoria', 'Kwota']]

    # 2. Czyszczenie Kwoty (zamiana "-123,50 PLN" na float -123.50)
    def clean_amount(val):
        if pd.isna(val): return 0.0
        val = str(val)
        val = val.replace(' PLN', '').replace(' ', '').replace(',', '.')
        return float(val)

    df['Kwota'] = df['Kwota'].apply(clean_amount)

    # 3. Logika Biznesowa - Kategoryzacja
    def categorize(row):
        desc = str(row['Opis operacji']).upper()
        bank_cat = str(row['Kategoria']).title() # Oryginalna kategoria z banku
        
        # Twoje własne reguły (mają priorytet nad bankiem)
        if 'OPENAI' in desc or 'NETFLIX' in desc: return 'Subskrypcje'
        if 'JAKDOJADE' in desc or 'UBER' in desc: return 'Transport'
        if 'BIEDRONKA' in desc or 'LIDL' in desc or 'ŻABKA' in desc: return 'Jedzenie'
        if 'ZEN.COM' in desc or 'REVOLUT' in desc: return 'Finanse'
        if 'VECTRA' in desc: return 'Rachunki'
        if 'HEBE' in desc or 'ROSSMANN' in desc: return 'Uroda'
        
        # Jeśli nie mamy reguły, bierzemy to co dał bank (jeśli sensowne)
        # if bank_cat and bank_cat != 'Nan' and bank_cat != '':
        #     return bank_cat
            
        return 'Inne'

    df['Kategoria_System'] = df.apply(categorize, axis=1)

    # 4. Przygotowanie danych dla Reacta
    # Filtrujemy tylko wydatki (ujemne) i zmieniamy na dodatnie do wykresu
    expenses = df[df['Kwota'] < 0].copy()
    expenses['Kwota'] = expenses['Kwota'].abs()

    # Grupowanie do wykresu kołowego
    chart_data = expenses.groupby('Kategoria_System')['Kwota'].sum().reset_index().sort_values(by='Kwota', ascending=False)
    
    return {
        "total_spent": expenses['Kwota'].sum(),
        "chart_data": chart_data.to_dict(orient='records'),
        "transactions": df.head(10).to_dict(orient='records') # Zwracamy ostatnie 50 transakcji do tabeli
    }

# Testowe uruchomienie (tylko jeśli odpalasz plik bezpośrednio)
if __name__ == "__main__":
    with open("twoj_plik.csv", "rb") as f:
        result = parse_mbank_csv(f.read())
        print(result)