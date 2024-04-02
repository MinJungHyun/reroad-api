import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import _ from 'lodash';

const SALT_OR_ROUNDS = 10;
const ENCRYPTION_KEY = 'EWI17WUhd7q#78!h';
const ALGORITHM = 'aes-128-cbc';
const OUTPUT_ENCODING = 'hex';
const IV_LENGTH = 16;

const SHA_256_KEY = 'dDie8128ydIAUDSH38yhfi3jh8d7yf8d';

export class EncryptUtil {
  static TwoWay = {
    encrypt: (str: string): string => {
      if (!str) return '';
      try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(
          ALGORITHM,
          Buffer.from(ENCRYPTION_KEY),
          iv,
        );
        const encrypted = cipher.update(str);
        return (
          iv.toString(OUTPUT_ENCODING) +
          ':' +
          Buffer.concat([encrypted, cipher.final()]).toString(OUTPUT_ENCODING)
        );
      } catch (err) {
        console.error('encrypt error', err);
        throw err;
      }
    },
    decrypt: (encryptedStr: string): string => {
      if (!encryptedStr) return '';
      try {
        const textParts: string[] = encryptedStr.split(':');
        const iv = Buffer.from(textParts.shift() as string, OUTPUT_ENCODING);
        const encryptedText = Buffer.from(textParts.join(':'), OUTPUT_ENCODING);
        const decipher = crypto.createDecipheriv(
          ALGORITHM,
          Buffer.from(ENCRYPTION_KEY),
          iv,
        );
        const decrypted = decipher.update(encryptedText);
        return Buffer.concat([decrypted, decipher.final()]).toString();
      } catch (err) {
        console.error('encrypt error', err);
        throw err;
      }
    },
  };

  static OneWay = {
    encrypt: async (str: string): Promise<string> => {
      if (!str) return '';
      const hashedPassword = await bcrypt.hash(str, SALT_OR_ROUNDS);
      return hashedPassword;
    },
    compare: async (str: string, encryptedStr: string): Promise<boolean> => {
      return await bcrypt.compare(str, encryptedStr);
    },
    sha256: (str: string): string => {
      if (_.isNumber(str)) str = str.toString();
      return crypto.createHmac('sha256', SHA_256_KEY).update(str).digest('hex');
    },
  };
}
