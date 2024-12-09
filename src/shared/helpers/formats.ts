/**
 * @description Transforma la fecha a un formato legible
 */
export function formatDate(params: { day: number; month: number; year: number; }) {
    const date = new Date(params.year , params.month - 1, params.day);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * 
 * @description Transforma la candidad de minutos de la pelcula a un formato mas legible
 */
export function formatHour(minutes: number) {
    return minutes % 60
        ? `${Math.floor(minutes / 60)}h ${minutes % 60}min`
        : `${Math.floor(minutes / 60)}h`
}

/**
 * 
 * @description Transforma el monto de las divisas a un formato mas legible
 */
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
  

export function getDateInSeconds() {
    return Math.floor(Date.now() / 1000);
}