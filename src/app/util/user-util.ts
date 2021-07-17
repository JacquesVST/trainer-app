import { MediaFile } from '../model/media-file/media-file.model';
import { User } from '../model/user/user.model';
import { StorageUtil } from './storage-util';

export class UserUtil {
    public static setUser(user: User): void {
        const picture = new MediaFile();
        picture.id = user?.picture?.id;
        user.picture = picture;
        return StorageUtil.setLocalItem('user', user);
    }

    public static getUser(): User {
        return StorageUtil.getLocalItem('user');
    }

    public static unsetUser(): void {
        localStorage.removeItem('user');
    }
}
