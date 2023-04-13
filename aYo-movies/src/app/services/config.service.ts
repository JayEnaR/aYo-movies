import { Injectable } from '@angular/core';
import config from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get apiBaseUrl(): string {
    return config.apiBaseUrl;
  }
}
