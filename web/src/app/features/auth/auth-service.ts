import { Injectable } from '@angular/core';
import { paths } from '../../types/api/api-types';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(body: paths['/auth/login']['post']['requestBody']['content']['application/json']) {
    try {
      const res = await fetch(`${environment.apiUrl}/auth/login`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
}
