export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calculateRadius(area: number): number {
    if (area <= 0) {
        throw new Error("The area must be a positive number.");
    }
    return Math.sqrt(area / Math.PI);
}
