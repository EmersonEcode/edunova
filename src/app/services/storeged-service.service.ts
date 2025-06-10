import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'

})

export class StorageService {
  // Uma chave secreta para criptografia. Mantenha-a em segredo!
  private encryptionKey = '9b3c4d5f7e8a9d1f0123456789abcdef';

  // Criptografando os dados antes de armazenar
  encryptAndStoreData(key: string, value: string): void {
    try {
      const encryptedValue = CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
      sessionStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Erro ao criptografar e armazenar dados:', error);
    }
  }

  // Recuperando e descriptografando os dados
  decryptAndRetrieveData(key: string): string | null {
    try {
      const encryptedValue = sessionStorage.getItem(key);
      if (encryptedValue) {
        const bytes = CryptoJS.AES.decrypt(encryptedValue, this.encryptionKey);
        const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);

        // Retorna null se a descriptografia não produzir um valor válido
        return decryptedValue || null;
      }
      return null;
    } catch (error) {
      console.error('Erro ao descriptografar e recuperar dados:', error);
      return null; // Retorna null em caso de erro
    }
  }
}
