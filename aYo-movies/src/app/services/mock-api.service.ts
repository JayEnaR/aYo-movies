import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/** 
 * Moch service to retrieve the api Key. Typically one would use something like Consul
 */ 

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private apiKeySubject: Subject<string> = new Subject<string>();
  apiKey!: string; 

  constructor() { 
    this.initApiKey();
    this.apiKeySubject.next("cf250d74");
  }

  private initApiKey(): void {
    this.apiKeySubject.subscribe(key => this.apiKey = key);
  }

}
