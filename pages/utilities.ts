// Function to generate random string with specified length
export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


export function getFormattedDateYYY_MM_DD() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
}