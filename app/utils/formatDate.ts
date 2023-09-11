export function formatDate(inputDate: Date) {
    const date = new Date(inputDate);
    const currentDate = new Date();

    // Adjust the date to GMT+5 (Pakistan Standard Time)
    date.setHours(date.getHours() + 5);

    // Check if the date is today or tomorrow
    if (date.toDateString() === currentDate.toDateString()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        if (hours === 0 && minutes === 0) {
            return 'Today';
        } else {
            // Format the time with GMT+5 offset
            const time = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
            return `Today, ${time}`;
        }
    } else {
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + 1);
        if (date.toDateString() === tomorrow.toDateString()) {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            // Format the time with GMT+5 offset
            const time = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
            return `Tomorrow, ${time}`;
        } else {
            // Format the date and time with GMT+5 offset
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
        }
    }
}
