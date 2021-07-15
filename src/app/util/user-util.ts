import { User } from "../model/user/user.model";
import { getLocalItem, setLocalItem } from "./storage-util";

export function setUser(user: User): void {
    return setLocalItem('user', user);
}

export function getUser(): User {
    return getLocalItem('user');
}

export function unsetUser(): void {
    localStorage.removeItem('user')
}

