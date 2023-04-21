import { webcrypto } from "crypto";
import { pbkdf2Sync } from "crypto";

export class OCrypto{

    static computeHash(password: string, salt: Buffer){
        const hash = pbkdf2Sync(password, salt, 10000, 128, 'sha1') 
        return OCrypto.convertToBase64String(hash);
    }

    static generateSalt(){
        return webcrypto.getRandomValues(new Uint16Array(16))
    }

    static convertToBase64String(data: ArrayBuffer){
        return Buffer.from(data).toString('base64');
    }

    static convertFromBase64ToAscii(data: string){
        Buffer.from(data).toString('latin1')
    }
}