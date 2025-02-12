




export const parseDate = (dateString: string | undefined): Date | string => {
    return dateString ? new Date(dateString) : "Invalid Date"
}; 
