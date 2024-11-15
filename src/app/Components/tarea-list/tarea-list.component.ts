import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 
import { TareaService } from '../../services/tarea.service';
import { createTarea } from '../../Models/createtarea.model';
import { TareaModel } from '../../Models/tarea.model';
import { UserModel } from '../../Models/user.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule, DropdownModule],
  templateUrl: './tarea-list.component.html',
  providers: [DialogService],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter', [
        animate('500ms 0s ease-in')
      ]),
      transition(':leave', [
        animate('500ms 0s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ],
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent {
  tareas: TareaModel[] = [];
  displayDialog: boolean = false;
  tareaForm!: FormGroup;
  usuarios: UserModel[] = [];
  isEditing: boolean = false;


  constructor(private fb: FormBuilder, private tareaService: TareaService, private usuarioService: UsuarioService){}

  ngOnInit(){
    this.tareaForm = this.fb.group({
      idTarea: [null],
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      completada: [false],
      usuarioo: [null, Validators.required]
    });
    this.loadTareas();
    this.loadUsuarios();
  }
  openDialog(tarea?:any){
    this.displayDialog = true;
    this.isEditing = tarea;
    if(tarea){
      this.tareaForm.patchValue(tarea);
    }
    else{
      this.tareaForm.reset;
    }
  }

  loadUsuarios(){
    console.log('pene');
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      console.log(data);
    });
  }

  loadTareas(){
    console.log('pene');
    this.tareaService.getTareas().subscribe((data) => {
      this.tareas = data;
      console.log(data);
    });
    
  }

  closeDialog(){
    this.displayDialog = false;
  }

  saveTarea(){
    if (this.tareaForm.valid){
      const tareaData = this.tareaForm.value;
      if(this.isEditing){
        this.updateTarea(tareaData);
      }
      else{
        this.createTarea(tareaData);
      }    
    }
  }

  createTarea(tareaData: any) {
    this.tareaService.createTareas({
      tarea: tareaData.tarea,
      descripcion: tareaData.descripcion,
      idUsuario: tareaData.usuarioo?.idUsuario,
    }).subscribe(() => {
      this.loadTareas();
      this.displayDialog = false;
    })
  }

  updateTarea(TareaData: any){
    this.tareaService.updateTarea(TareaData.idTarea,{
      tarea: TareaData.tarea,
      descripcion: TareaData.descripcion
    }).subscribe(()=> {
      this.loadTareas();
      this.displayDialog = false
    })
  }

  deleteTarea(id: number){
    this.tareaService.deleteTarea(id).subscribe(() =>{
      this.loadTareas();
    })
  }

  finishTarea(tarea: any){
    tarea.completada = !tarea.completada;
    this.tareaService.finishTarea(tarea.idTarea).subscribe(()=>{
      this.loadTareas();
    })
  }
}

