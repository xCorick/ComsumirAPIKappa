import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button'; 

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule],
  templateUrl: './usuario-list.component.html',
  providers: [DialogService],
  animations: [
    trigger('fadeInOut',[
      state('void', style({opacity: 0})),
      transition(':enter',[animate('500ms ease-in')]),
      transition(':leave', [animate('500ms ease-out', style({opacity: 0}))])
    ])
  ],
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  usuarios: any[] = [];
  displayDialog: boolean = false;
  usuarioForm!: FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(){this.usuarioForm = this.fb.group({
    idUsuario: [null],
    nombres: ['', Validators.required],
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  });
  }

  openDialog(){
    this.displayDialog = true;
  }

  closeDialog(){
    this.displayDialog = false;
  }
}
