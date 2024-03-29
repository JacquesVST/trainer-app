import { enUs } from './../config/literals/en-us';
import { ptBr } from '../config/literals/pt-br';

export class Literals {
    public static getLiterals() {
        const navigatorLanguage = navigator.language.substring(0, 2);
        if (navigatorLanguage.toLowerCase() === 'pt') {
            return ptBr;
        } else {
            return enUs;
        }
    }
}
