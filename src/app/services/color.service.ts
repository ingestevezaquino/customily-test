import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }

  getColorName(hex: string): Observable<any> {
    return this.httpClient.get<any>('https://www.thecolorapi.com/id?hex=' + hex, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
