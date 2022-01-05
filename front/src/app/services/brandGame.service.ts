import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BrandGameService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  getListBrandGame(data: any) {
    return this.http.get(this.baseUrl + "/game/all", { params: { ...data } });
  }
}
