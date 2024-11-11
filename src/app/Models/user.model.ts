import { TareaModel } from "./tarea.model";

export interface UserModel{
    idUsuario: number;
    nombres: string;
    usuario: string;
    contrasena: string;
    tareas: TareaModel[];
}