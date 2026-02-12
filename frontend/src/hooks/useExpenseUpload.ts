// src/hooks/useExpenseUpload.ts
import { useState } from 'react';
import { uploadExpensesFile } from '../api/expensesApi';
import type { AnalysisResult } from '../types/api';

export const useExpenseUpload = (onSuccess: (data: AnalysisResult) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await uploadExpensesFile(file);
      onSuccess(data);
    } catch (err) {
      console.error(err);
      setError('Nie udało się połączyć z serwerem.');
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading, error };
};