import { User } from "../model/user.model";

export function setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
}

export function getUser(): User {
    const userString: string = localStorage.getItem('user');

    try {
        const user: User = JSON.parse(userString);
        console.log(user);
        return user
    } catch (error) {
        return null;
    }
}

export function unsetUser(): void {
    localStorage.removeItem('user')
}

