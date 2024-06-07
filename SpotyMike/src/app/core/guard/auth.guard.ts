import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { IToken } from '../interfaces/user';

export const authGuard: CanActivateFn = (route, state) => {
  const localStore = inject(LocalStorageService);
  const token = localStore.getItem('token').getValue();
  console.log(token);
  return token != new Array() ? true : false;
};
