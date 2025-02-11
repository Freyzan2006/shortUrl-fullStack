


export function parseDate(time: Date | undefined) : string {
    if (!time) return ""

    return time instanceof Date
    ? time.toLocaleString()
    : 'Invalid Date';
}