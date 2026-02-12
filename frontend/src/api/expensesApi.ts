import axios from 'axios';
import type { AnalysisResult } from '../types/api';

const API_URL = 'http://127.0.0.1:8000';

export const uploadExpensesFile = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<AnalysisResult>(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};