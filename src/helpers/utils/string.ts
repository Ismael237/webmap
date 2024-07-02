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

export function darkenHexColor(hexColor: string, percent: number): string {
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    const darkenedHex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    return darkenedHex;
}