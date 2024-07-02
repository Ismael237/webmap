export function capitalizeFirstLetter(sentence: string): string {
    if (typeof sentence !== 'string' || sentence.length === 0) {
        return sentence;
    }
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export function splitPhraseIntoLines(phrase: string, maxLength: number): string[] {
    const words = phrase.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });

    if (currentLine.trim().length > 0) {
        lines.push(currentLine.trim());
    }

    return lines;
}