import { pbkdf2Sync, webcrypto } from "crypto";
import { sign, verify, decode } from 'jsonwebtoken';

export class OCrypto {

    static secret = "0xb4edca3e0xcaf50x45ba0xae0x000x560xf30x9d0xf10x6b0x87"

    static computeHash(password: string, salt: Buffer) {
        const hash = pbkdf2Sync(password, salt, 10000, 128, 'sha1')
        return OCrypto.convertToBase64String(hash);
    }

    // static verifyPassword(password: string, saltStr: string){
    //     const salt = Buffer.from(saltStr);
    //     const hash = pbkdf2Sync(password, salt, 10000, 128, 'sha1');
    // }

    static generateSalt() {
        return webcrypto.getRandomValues(new Uint16Array(16))
    }

    static convertToBase64String(data: ArrayBuffer) {
        return Buffer.from(data).toString('base64');
    }

    static convertFromBase64ToAscii(data: string) {
        return Buffer.from(data).toString('latin1')
    }

    static tokenizeObject(data: object | string | Buffer): string {
        return sign(data, OCrypto.secret, { algorithm: "HS256", issuer: "peage20.srv", expiresIn: '1d', audience: 'peage20.website' })
    }

    /** Decode a jwt token string and return the stringified payload.
     * JSON.parse() it if it's an object like structure 
     */
    static verifyAnddecodeJwtToken(token: string): string {
        const decodedJwt = verify(token, OCrypto.secret, { issuer: "peage20.srv", audience: 'peage20.website' })
        return JSON.stringify(decodedJwt);
    }
}