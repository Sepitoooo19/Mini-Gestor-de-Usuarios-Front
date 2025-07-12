



/**
 * Formatea una fecha a formato DD/MM/YYYY
 * @param dateString - Fecha en string, Date o null/undefined
 * @returns Fecha formateada o 'N/A' si no hay fecha
 */
export const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) {
    return 'N/A';
  }
  
  let date: Date;
  
  // Si es un string con formato YYYY-MM-DD, agregamos la hora para evitar problemas de zona horaria
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(dateString + 'T00:00:00');
  } else {
    date = new Date(dateString);
  }
  
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Formatea una fecha a formato DD/MM/YYYY HH:MM
 * @param dateString - Fecha en string, Date o null/undefined
 * @returns Fecha con hora formateada o 'N/A' si no hay fecha
 */
export const formatDateTime = (dateString: string | Date | null | undefined): string => {
  if (!dateString) {
    return 'N/A';
  }
  
  let date: Date;
  
  // Si es un string con formato YYYY-MM-DD, agregamos la hora para evitar problemas de zona horaria
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    date = new Date(dateString + 'T00:00:00');
  } else {
    date = new Date(dateString);
  }
  
  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};