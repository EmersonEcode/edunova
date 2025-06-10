import { Injectable } from '@angular/core';
import { User, InfoUser } from '../models/user.model';
import { StorageService } from './storeged-service.service';
import { GoogleUser } from '../models/google.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 constructor( private storageService: StorageService){

 }

  getUser(): User {
    return {
      email: this.storageService.decryptAndRetrieveData('userEmail'),
      password: this.storageService.decryptAndRetrieveData('userPassword')
    };
  }

  getInfoUser(): InfoUser{
    return {
      name: this.storageService.decryptAndRetrieveData('userName'),
      cpf: this.storageService.decryptAndRetrieveData('userCpf'),
      tel: this.storageService.decryptAndRetrieveData('userTel'),
      picture: ''
    }
  }

  getInfoUserGoogle(): GoogleUser{
    return {
      name: sessionStorage.getItem('googleUserName'),
      email: sessionStorage.getItem('googleUserEmail'),
      picture: sessionStorage.getItem('googleUserPicture')
    }
  }

  getUserTypeLogin(): string | null{
    return sessionStorage.getItem('typeLogin')
  }
}
