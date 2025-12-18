# 💰 Budget Tracker (Fullstack App)
GitLab link:
https://gitlab.com/marekbor1-group/expense_tracker

Profesjonalna aplikacja webowa do analizy wydatków domowych, umożliwiająca automatyczne przetwarzanie wyciągów bankowych (CSV) i wizualizację danych.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 📌 O projekcie

Budget Tracker rozwiązuje problem ręcznego śledzenia finansów. Aplikacja pozwala użytkownikowi wgrać surowy plik CSV z banku (obecnie zoptymalizowane pod **mBank**), a system automatycznie:
1.  Analizuje transakcje.
2.  Przypisuje kategorie (np. Jedzenie, Transport) na podstawie słów kluczowych.
3.  Prezentuje wyniki na interaktywnym wykresie.

Projekt stworzony w celu nauki architektury **Fullstack**, typowania w **TypeScript** oraz analizy danych w **Python Pandas**.

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
* **React** (Vite) – Szybki i nowoczesny framework.
* **TypeScript** – Dla zapewnienia bezpieczeństwa typów i lepszej jakości kodu.
* **Recharts** – Do renderowania wykresów.
* **Axios** – Do komunikacji z API.

### Backend
* **Python 3.10+**
* **FastAPI** – Nowoczesny, asynchroniczny framework backendowy.
* **Pandas** – Zaawansowana analiza i przetwarzanie danych.
* **Uvicorn** – Serwer ASGI.

---

## ⚙️ Instalacja i Uruchomienie

Aby uruchomić projekt lokalnie, potrzebujesz zainstalowanego Node.js oraz Pythona.
