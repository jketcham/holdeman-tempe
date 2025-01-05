export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}): string {
	if (!dateString) return '';

	// Convert SQLite datetime to ISO format by adding 'Z' to make it UTC
	const isoString = dateString.replace(' ', 'T') + 'Z';
	const date = new Date(isoString);

	return date.toLocaleString(undefined, {
		timeZone: 'America/Phoenix',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		...options
	});
}

export function toISOString(dateString: string | null): string | null {
	if (!dateString) return null;

	// Create a date object in local time
	const date = new Date(dateString);

	// Convert to ISO string (which will be in UTC)
	return date.toISOString();
}

export function toSQLiteDateTime(dateString: string | null): string | null {
	if (!dateString) return null;

	// Create a date object
	const date = new Date(dateString);

	// Format as YYYY-MM-DD HH:MM:SS
	return date.toISOString().replace('T', ' ').replace('.000Z', '');
}

export function fromSQLiteDateTime(sqliteDate: string | null): string | null {
	if (!sqliteDate) return null;

	// Convert SQLite datetime to a Date object, treating it as UTC
	const [datePart, timePart] = sqliteDate.split(' ');
	const localDate = new Date(`${datePart}T${timePart}Z`); // The Z makes it UTC

	// Format for datetime-local input (YYYY-MM-DDTHH:mm)
	const year = localDate.getFullYear();
	const month = String(localDate.getMonth() + 1).padStart(2, '0');
	const day = String(localDate.getDate()).padStart(2, '0');
	const hours = String(localDate.getHours()).padStart(2, '0');
	const minutes = String(localDate.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}
