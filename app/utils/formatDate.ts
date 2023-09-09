export function formatDate(inputDate: Date): string {
    const currentDate = new Date();
    const date = new Date(inputDate);

    // Set the time zone to Pakistan Standard Time (UTC+5)
    date.setTime(date.getTime() + (5 * 60 * 60 * 1000));

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
        return `Today, ${date.toLocaleString('en-PK', options)}`;
    } else if (isTomorrow) {
        return `Tomorrow, ${date.toLocaleString('en-PK', options)}`;
    } else {
        return date.toLocaleString('en-PK', options);
    }
}
