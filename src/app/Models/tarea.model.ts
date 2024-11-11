import { UserModel } from "./user.model";

export interface TareaModel{
    idTarea: number;
    tarea: string;
    descripcion: string;
    completada: boolean;
    user: UserModel;
}