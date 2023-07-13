import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  task: string | undefined;
  column: string | undefined;
  highlightColor: string | undefined;

  constructor(
    public dialog: MatDialog
  ) { }

  boardName = 'Quadro 1'

  todo = ['Ir para o trabalho', 'Comprar mantimentos', 'Ir para casa', 'Adormecer'];

  done = ['Levantar', 'Escovar os dentes', 'Tomar um banho', 'Verificar o e-mail', 'Passear com o cachorro'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openNewTask() {
    const dialogRef = this.dialog.open(DialogNewTask);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTasks() {
    const dialogRef = this.dialog.open(DialogTasks);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-new-task',
  templateUrl: 'dialog-new-task.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule],
})
export class DialogNewTask { }

interface Tarefa {
  nome: string;
  concluida: boolean;
}

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, CommonModule, FormsModule],
})
export class DialogTasks {
  tarefas: Tarefa[] = [
    { nome: 'andar de carro', concluida: false },
    { nome: 'seguir a pé', concluida: true }
  ];
  novaTarefa: string = '';

  adicionarTarefa(): void {
    if (this.novaTarefa.trim() !== '') {
      this.tarefas.push({ nome: this.novaTarefa.trim(), concluida: false });
      this.novaTarefa = '';
    }
    console.log(this.tarefas);
  }

  alterarConclusao(tarefa: Tarefa): void {
    tarefa.concluida = !tarefa.concluida;
  }
}