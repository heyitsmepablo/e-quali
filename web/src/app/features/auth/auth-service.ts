import { Injectable } from '@angular/core';
import { paths } from '../../types/api/api-types';
import { AxiosService } from '../../services/axios-service/axios-service';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: AxiosService) {}

  async login(
    body: paths['/auth/login']['post']['requestBody']['content']['application/json']
  ): Promise<paths['/auth/login']['post']['responses']['200']['content']['application/json']> {
    try {
      const res = await this.http.instance.post('/auth/login', body);
      return res.data;
    } catch (error: any) {
      if (this.http.isAxiosError(error)) {
        throw {
          status: error.status,
          code: error.response?.data?.code,
          message: error.response?.data?.message,
        };
      }
      throw { status: 500, error };
    }
  }
}
