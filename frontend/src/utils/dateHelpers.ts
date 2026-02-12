export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getFirstDayOfMonth = (): string => {
  const date = new Date();

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1); 
  
  const offset = firstDay.getTimezoneOffset();
  const localDate = new Date(firstDay.getTime() - (offset * 60 * 1000));
  
  return localDate.toISOString().split('T')[0];
};