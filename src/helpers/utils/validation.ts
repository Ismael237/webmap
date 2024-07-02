export function isDefinedAndNotEmpty(value: string | undefined | null) {
    return value !== undefined && value !== null && String(value).trim() !== '';
}