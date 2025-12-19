# 💰 Budget Tracker

Aplikacja służąca do analizy wydatków na podstawie wyciągu z banku używając pliku csv

## 📌 O projekcie

Budget Tracker rozwiązuje problem ręcznego śledzenia finansów. Aplikacja pozwala użytkownikowi wgrać plik CSV, a system automatycznie:
1.  Analizuje transakcje.
2.  Przypisuje kategorie (np. Jedzenie, Transport) na podstawie słów kluczowych.
3.  Prezentuje wyniki na interaktywnym wykresie.

Projekt stworzony w celu nauki backendiu i frontendu, typowania w **TypeScript** oraz analizy danych używając Pythona.

---

## 🚀 Funkcjonalności

-   [x] **Upload plików CSV** – Przesyłanie wyciągów bankowych metodą Drag & Drop.
-   [x] **Automatyczna kategoryzacja** – Backend w Pythonie rozpoznaje typ transakcji.
-   [x] **Wizualizacja danych** – Interaktywny wykres kołowy (Pie Chart) przy użyciu biblioteki Recharts.
-   [x] **Podsumowanie finansowe** – Tabela z historią transakcji i sumą wydatków.
-   [ ] **Filtrowanie po dacie** – (Feature w trakcie developmentu).
-   [ ] **Logowanie użytkowników** – (Planowane).

---

## 🛠 Technologie

### Frontend
* **React** (Vite) 
* **TypeScript** – Dla zapewnienia bezpieczeństwa typów i lepszej jakości kodu.
* **Recharts**
* **Axios** – Do komunikacji z API. 

### Backend
* **Python 3.10+**
* **FastAPI**
* **Pandas**
* **Uvicorn** 

---

## ⚙️ Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, potrzebujesz zainstalowanego Node.js oraz Pythona.
