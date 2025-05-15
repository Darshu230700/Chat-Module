import CryptoJS from 'crypto-js';
import { ENCRYPT_KEY_1, ENCRYPT_KEY_2, ENCRYPT_KEY_3 } from 'src/config-global';

const Key1 = ENCRYPT_KEY_1;
const Key2 = ENCRYPT_KEY_2;
const Key3 = ENCRYPT_KEY_3;


const padKey = (key) => {
    return key.padEnd(32, ' '); // Ensure the key is padded to 32 characters
};

const decryptWithKey = (encryptedData, key) => {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(padKey(key));
    const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000'); // Fixed IV
    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyUtf8, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

export const Decrypt = (encryptedText) => {
    const firstDecrypt = decryptWithKey(encryptedText, Key3);
    const secondDecrypt = decryptWithKey(firstDecrypt, Key2);
    const finalDecrypt = decryptWithKey(secondDecrypt, Key1);
    return finalDecrypt && JSON?.parse(finalDecrypt);
};
