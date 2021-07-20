import { Literals } from './literal-util';
export class ActivityUtil {
    public static checkTotal(dur: number, rep: number, set: number, title?: string): string {
        if (dur) {
            return `${dur * (rep ? rep : 1) * (set ? set : 1)} ${Literals.getLiterals().form.seconds}`;
        }

        if (rep && !set) {
            return title ? `${rep} ${title}` : `${rep}`;
        }

        if (set && !rep) {
            return title ? `${set} ${title}` : `${rep}`;
        }

        if (rep && set) {
            return title ? `${rep * set} ${title}` : `${rep * set}`;
        }

        return '...';
    }
}
