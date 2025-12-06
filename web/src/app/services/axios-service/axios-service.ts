import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axios = axios.create({
    baseURL: environment.apiUrl,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  get instance() {
    return this.axios;
  }

  isAxiosError(obj: any) {
    return axios.isAxiosError(obj);
  }
}
