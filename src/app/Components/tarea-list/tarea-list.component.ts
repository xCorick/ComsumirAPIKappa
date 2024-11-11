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


  constructor(private fb: FormBuilder, private tareaService: TareaService){}

  ngOnInit(){
    this.tareaForm = this.fb.group({
      idTarea: [null],
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      completada: [false],
      usuarioo: [null, Validators.required]
    });
  }
  openDialog(){
    this.displayDialog = true;
  }

  loadTareas(){
    this.tareaService.getTareas().subscribe((data: TareaModel[])=>{
      this.tareas = data;
    });
  }

  closeDialog(){
    this.displayDialog = false;
  }
}
