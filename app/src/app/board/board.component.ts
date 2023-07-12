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

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

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
}

@Component({
  selector: 'dialog-new-task',
  templateUrl: 'dialog-new-task.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogNewTask { }
