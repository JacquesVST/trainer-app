export function setLocalItem(id: string, item: any) {
    localStorage.setItem(id, btoa(JSON.stringify(item)));
}

export function getLocalItem(id: string): any {
    const itemString: string = localStorage.getItem(id);
    try {
        return JSON.parse(atob(itemString));
    } catch (error) {
        console.error(error)
        return null;
    }
}