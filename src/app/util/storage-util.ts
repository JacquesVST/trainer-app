export class StorageUtil {
    public static setLocalItem(id: string, item: any): void {
        localStorage.setItem(id, btoa(JSON.stringify(item)));
    }

    public static getLocalItem(id: string): any {
        const itemString: string = localStorage.getItem(id);
        try {
            return JSON.parse(atob(itemString));
        } catch (error) {
            console.error(error)
            return null;
        }
    }
}
