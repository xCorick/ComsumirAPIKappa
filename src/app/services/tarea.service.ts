import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaModel } from '../Models/tarea.model';
import { createTarea } from '../Models/createtarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl ='https://localhost:44336/api/Tarea';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaModel[]>{
    return this.http.get<TareaModel[]>(this.apiUrl);
  }

  createTareas(tarea: createTarea): Observable<TareaModel>{
    return this.http.post<TareaModel>(this.apiUrl, tarea);
  }
}
