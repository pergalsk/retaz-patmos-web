import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface SysdateResponse {
  rfc822: string;
  sysdate: string;
  systime: string;
  timestamp: number;
}

export interface DatesResponse {
  id: number;
  date: string;
  names: string[];
  timestamp: string;
}

export interface PutNameRequest {
  date: string;
  name: string;
}


@Injectable({
  providedIn: 'root',
})
export class CommonApiService {
  constructor(private httpClient: HttpClient) {}

  getSysDateTime(): Observable<SysdateResponse> {
    return this.httpClient.get<SysdateResponse>('/api/sysdate');
  }

  getDates(year: string): Observable<DatesResponse[]> {
    let params = new HttpParams();
    params = params.append('year', year);

    return this.httpClient.get<DatesResponse[]>('/api/dates', { params });
  }

  submitAnswers(submitData: PutNameRequest): Observable<string[]> {
    return this.httpClient.put<string[]>('/api/dates', submitData);
  }

}
