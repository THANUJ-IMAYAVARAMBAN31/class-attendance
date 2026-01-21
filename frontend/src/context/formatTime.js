export const formatTime = (dateString) => {
  if (!dateString) return '-';

  const date = new Date(dateString);

  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
