import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface SysdateResponse {
  rfc822: string;
  sysdate: string;
  systime: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  constructor(private httpClient: HttpClient) {}

  getSysDateTime(): Observable<SysdateResponse> {
    return this.httpClient.get<SysdateResponse>('/api/sysdate');
  }
}
