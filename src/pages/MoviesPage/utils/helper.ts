import {randanimalSync} from "randanimal";

// Converts a string to lowercase letters
export const getFormatToLowercase = (word: string): string => {
    return word.toLowerCase();
}

// Creates a two word username (Adjective Noun)
export const getGenerateUsername = (): string => {
    return randanimalSync();
}
