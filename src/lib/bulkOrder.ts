const toLocalDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const getBulkOrderMinimumDate = (today = new Date()) => {
  const localToday = toLocalDate(today);
  const targetMonthIndex = localToday.getMonth() + 2;
  const targetYear = localToday.getFullYear() + Math.floor(targetMonthIndex / 12);
  const targetMonth = targetMonthIndex % 12;
  const targetDay = Math.min(localToday.getDate(), daysInMonth(targetYear, targetMonth));

  return new Date(targetYear, targetMonth, targetDay);
};

export const formatDateInputValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isBulkOrderDateAllowed = (dateValue: string, today = new Date()) => {
  if (!dateValue) return false;

  const [year, month, day] = dateValue.split('-').map(Number);
  if (!year || !month || !day) return false;

  const requestedDate = new Date(year, month - 1, day);
  const minimumDate = getBulkOrderMinimumDate(today);

  return requestedDate >= minimumDate;
};
