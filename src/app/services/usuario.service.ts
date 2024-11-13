import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl ='https://localhost:44336/api/User';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  // createTareas(tarea: createTarea): Observable<UserModel>{
  //   return this.http.post<UserModel>(this.apiUrl, tarea);
  // }
}
