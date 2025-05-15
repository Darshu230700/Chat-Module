import CryptoJS from 'crypto-js';
import { ENCRYPT_KEY_1, ENCRYPT_KEY_2, ENCRYPT_KEY_3 } from 'src/config-global';

const Key1 = ENCRYPT_KEY_1;
const Key2 = ENCRYPT_KEY_2;
const Key3 = ENCRYPT_KEY_3;


const padKey = (key) => { return key.padEnd(32, ' ') };

const encryptWithKey = (data, key) => {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(padKey(key));
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Fixed IV, consider changing to a random IV for better security
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), keyUtf8, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};

export const Encrypt = (data) => {
    const firstEncrypt = encryptWithKey(data, Key1);
    const secondEncrypt = encryptWithKey(firstEncrypt, Key2);
    const finalEncrypt = encryptWithKey(secondEncrypt, Key3);
    return finalEncrypt;
};
