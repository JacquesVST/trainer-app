import { getEnLiterals } from "../config/literals/en-us";
import { getPtLiterals } from "../config/literals/pt-br";

export function getLiterals() {
    const navigatorLanguage = navigator.language.substring(0, 2);
    if (navigatorLanguage.toLowerCase() === 'pt') {
        return getPtLiterals();
    } else {
        return getEnLiterals();
    }
}