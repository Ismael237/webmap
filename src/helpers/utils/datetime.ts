export function formatDate(timeStamp: number){
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Avr',
        'May',
        'Jun',
        'Jul',
        'Aou',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const date = new Date(timeStamp * 1000);
    const monthIndex = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${months[monthIndex]} ${day}, ${year}`;
}

export function isCurrentTimeInRange(startTime: string, endTime: string): boolean {
    const currentTime = new Date();
  
    const start = new Date();
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    start.setHours(startHours, startMinutes, 0, 0);
  
    const end = new Date();
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    end.setHours(endHours, endMinutes, 0, 0);
  
    if (start <= end) {
      return currentTime >= start && currentTime <= end;
    } else {
      return currentTime >= start || currentTime <= end;
    }
  }