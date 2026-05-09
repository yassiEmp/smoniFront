import { 
  format,           // formate une date (ex: '2025-05-05' → 'Lun 05')
  addDays,          // ajoute X jours à une date
  addWeeks,         // ajoute X semaines à une date
  subWeeks,         // soustrait X semaines à une date
  startOfWeek,
  //isSameDay,        // compare si 2 dates sont le même jour
  //parseISO,         // parse une string en objet Date
  //getDay,           // retourne l'index du jour (0 = dimanche, 1 = lundi, ...)
  //getDate
} from 'date-fns';

import { fr } from 'date-fns/locale'; // Pour avoir les noms de jour/mois en français

export const getActualWeekDays = () => {
    const weekDays = Array.from({ length: 7 }).map((_, i) =>
        addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), i)
    );
    
    return weekDays;
}

export const getNextWeekDays = (actualWeekDays: string|number|Date) => {
    const weekDays = Array.from({ length: 7 }).map((_, i) =>
       addDays(startOfWeek(addWeeks(actualWeekDays,1), { weekStartsOn: 1 }), i)
    );
    
    return weekDays;
}

export const getPreviousWeekDays = (actualWeekDays: string|number|Date) => {
    const weekDays = Array.from({ length: 7 }).map((_, i) =>
       addDays(startOfWeek(subWeeks(actualWeekDays,1), { weekStartsOn: 1 }), i)
    );
    
    return weekDays;
}

export const weekDaysFormat = (weekday: any[]) => {
    const weekDays = weekday.map((date) =>
       format(new Date(date), "EEE dd", { locale: fr })
    );
    
    return weekDays;
}

export const getDayNameInFrench = (date: Date | string): string => {
    let dateObj: Date;
    
    try {
        if (typeof date === 'string') {
            if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const [year, month, day] = date.split('-').map(Number);
                dateObj = new Date(year, month - 1, day);
            }
            else if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                const [day, month, year] = date.split('/');
                dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
            else if (date.includes('T')) {
                const [year, month, day] = date.split('T')[0].split('-').map(Number);
                dateObj = new Date(year, month - 1, day);
            }
            else {
                throw new Error(`Format de date non supporté: ${date}`);
            }
        } else {
            dateObj = date;
        }

        if (isNaN(dateObj.getTime())) {
            throw new Error(`Date invalide: ${date}`);
        }

        return format(dateObj, 'EEEE', { locale: fr });
    } catch (error) {
        console.error('Erreur dans getDayNameInFrench:', error);
        return format(new Date(), 'EEEE', { locale: fr });
    }
};

export const formatDateToISO = (date: string): string => {
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date;
    }
    
    if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    if (date.includes('T')) {
        return date.split('T')[0];
    }
    
    if (date.match(/^\d{4}-\d{2}-\d{2}T/)) {
        return date.split('T')[0];
    }
    
    throw new Error(`Format de date non supporté: ${date}`);
};

export const formatHoursToSend = (hour: number | null): string => {
    if (hour === null) return "00:00:00";
    const paddedHours = hour.toString().padStart(2, '0');
    return `${paddedHours}:00:00`;
};

export const formatHoursToReceive = (date: string): string => {
    const [hours, minutes] = date.split(':');
    const paddedHours = hours.padStart(2, '0');
    return `${paddedHours}:${minutes}`;
};

export const getMonday = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d;
}

export const formatDateToLocalYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toLocalMidnightISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isDateTimeGreaterOrEqual = (dateToCompare: string, timeToCompare: string): boolean => {
  const now = new Date();
  
  // Handle ISO format with timezone
  if (timeToCompare.includes('T')) {
    const compareDate = new Date(timeToCompare);
    return now >= compareDate;
  }

  // Handle YYYY-MM-DD format
  const [year, month, day] = dateToCompare.split('-');
  const [hours, minutes] = timeToCompare.split(':');
  
  const compareDate = new Date(
    parseInt(year),
    parseInt(month) - 1, 
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  return now >= compareDate;
};

/**
 * Vérifie si un rendez-vous est dans le futur
 * @param date - Date au format ISO (ex: "2025-08-08T00:00:00.000000Z") ou "YYYY-MM-DD"
 * @param end_time - Heure de fin au format "HH:mm" (ex: "16:00")
 * @returns true si le rendez-vous est dans le futur, false sinon
 */
export const isFutureAppointment = (date: string, end_time: string): boolean => {
  if (!date || !end_time) return false;

  // Extraire la partie date (YYYY-MM-DD) si elle contient un "T"
  let d = date;
  if (date.includes("T")) {
    d = date.split("T")[0];
  }

  // Forcer le format de l'heure à HH:mm:ss
  let end = end_time;
  if (/^\d{2}:\d{2}$/.test(end_time)) end += ":00";

  // Construire la date/heure complète en ISO format pour UTC
  // Ceci est la correction principale : on traite tout en UTC
  const isoDateTime = `${d}T${end}.000Z`;
  const endDateTime = new Date(isoDateTime);

  // Debug logs pour vérifier le comportement (à retirer en production)
  console.log("Debug isFutureAppointment:", {
    originalDate: date,
    originalEndTime: end_time,
    constructedISO: isoDateTime,
    endDateTime: endDateTime.toISOString(),
    endDateTimeLocal: endDateTime.toLocaleString('fr-FR'),
    now: new Date().toISOString(),
    nowLocal: new Date().toLocaleString('fr-FR'),
    isFuture: endDateTime.getTime() > Date.now()
  });

  return endDateTime.getTime() > Date.now();
};

export function formatFrenchDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
}