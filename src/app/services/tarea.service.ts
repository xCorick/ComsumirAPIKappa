import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaModel } from '../Models/tarea.model';
import { createTarea } from '../Models/createtarea.model';
import { UpdateTareaModel } from '../Models/UpdateTareaModel.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl ='https://localhost:44336/api/Tarea';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<TareaModel[]> {
    return this.http.get<TareaModel[]>(this.apiUrl);
  }

  createTareas(tarea: createTarea): Observable<TareaModel> {
    return this.http.post<TareaModel>(this.apiUrl, tarea);
  }

  updateTarea(id: number, tarea: UpdateTareaModel): Observable<TareaModel>{
    return this.http.put<TareaModel>(`${this.apiUrl}/${id}`, tarea);
  }

  deleteTarea(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  finishTarea(id:number): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/ToggleStatus/${id}`, {});
  }
}
