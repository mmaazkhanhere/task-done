export function formatDate(inputDate: string): string {
    const currentDate = new Date();
    const date = new Date(inputDate);

    const isToday = date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();

    const isTomorrow = date.getDate() === currentDate.getDate() + 1 &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear();

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Include AM or PM
    };

    if (isToday) {
        return `Today, ${date.toLocaleString('en-US', options)}`;
    } else if (isTomorrow) {
        return `Tomorrow, ${date.toLocaleString('en-US', options)}`;
    } else {
        return date.toLocaleString('en-US', options);
    }
}

