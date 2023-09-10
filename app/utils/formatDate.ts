export function formatDate(inputDate: Date): string {
    const date = new Date(inputDate);

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Include AM or PM
    };

    return date.toLocaleString('en-US', options);
}
