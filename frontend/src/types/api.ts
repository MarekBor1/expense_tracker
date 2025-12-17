// src/types/api.ts

export interface Transaction {
  "Data operacji": string;
  "Opis operacji": string;
  "Rachunek": string;
  "Kategoria": string;
  "Kwota": number;
  "Kategoria_System": string; // To jest ta nasza nowa kolumna z Pythona
}

export interface ChartData {
  "Kategoria_System": string;
  "Kwota": number;
  [key: string]: any;
}

export interface AnalysisResult {
  total_spent: number;
  chart_data: ChartData[];
  transactions: Transaction[];
}