import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BoardService } from './board.service';

interface Task {
  id: number;
  title: string;
  color: string;
  subtasks: any[];
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  task: string | undefined;
  column: string | undefined;
  highlightColor: string | undefined;
  boardName = ''

  selectedBoardId: string | null = null

  columns: any

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.selectedBoardId = id
    this.getBoard(parseInt(id))
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/board')) {
          console.log(event)
          const id = this.route.snapshot.paramMap.get('id')!;
          this.getBoard(parseInt(id))
        }
      }
    })
  }

  getBoard(id: number): any {
    if (id === null) return
    return this.boardService.getBoard(id).subscribe(
      (data: any) => {
        if(data === null) return
        this.selectedBoardId = data.id
        this.boardName = data.name
        this.columns = data.columns.sort((a: any, b: any) => a.id - b.id);
        console.log(this.columns)
      },
      error => {
        console.log('error board.component', error)
      }
    )
  }

  getConnectedLists(columnId: number): string[] {
    return this.columns
      .filter((column: any) => column.id !== columnId)
      .map((column: any) => `column-${column.id}`);
  }

  drop(event: CdkDragDrop<Task[]>): void {    
    const taskId = Number(event.item.element.nativeElement.getAttribute('data-task-id'));
    const newColumnId = parseInt(event.container.element.nativeElement.getElementsByClassName('id')[0].innerHTML)
    console.log(taskId, newColumnId)

    this.boardService.moveTaskColumn(taskId, newColumnId, parseInt(this.selectedBoardId!)).subscribe(
        (data: any) => {
          console.log('Task moved successfully');
          this.columns = data.sort((a: any, b: any) => a.id - b.id);
          console.log(this.columns)
        },
        (error) => {
          console.error('Failed to move task:', error);
          // Revert the front-end change if an error occurs
          moveItemInArray(
            event.container.data,
            event.currentIndex,
            event.previousIndex
          );
        }
      );
  }

  openNewTask() {
    const dialogRef = this.dialog.open(DialogNewTask, {
      data: {columns: this.columns}
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  
  openNewColumn() {
    const dialogRef = this.dialog.open(DialogNewColumn, {
      data: {board: this.selectedBoardId}
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
  
  openDeleteBoard() {
    const dialogRef = this.dialog.open(DialogDeleteBoard, {
      data: {id: this.selectedBoardId, title: this.boardName}
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openTasks() {
    const dialogRef = this.dialog.open(DialogTasks);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'dialog-new-task',
  templateUrl: 'dialog-new-task.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
})
export class DialogNewTask {
  @Output() updating: EventEmitter<any> = new EventEmitter();
  taskForm: FormGroup = new FormGroup({
    columnId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    color: new FormControl(''),
  });
  selectedColumn: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boardService: BoardService
  ) {
    console.log(this.data.columns)
  }
  saveTask() {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value)
      this.boardService.newTask(this.taskForm.value.columnId, this.taskForm.value.title, this.taskForm.value.color).subscribe(
        data => {
          console.log(data)
          this.updating.emit(data)
        },
        error => console.log(error)
      )
    }
  }
}

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

@Component({
  selector: 'dialog-new-column',
  templateUrl: 'dialog-new-column.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, CommonModule, ReactiveFormsModule],
})
export class DialogNewColumn {
  @Output() updating: EventEmitter<any> = new EventEmitter();

  columnForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  saveColumn() {
    if (this.columnForm.valid) {
      const title = this.columnForm.value.title!
      this.boardService.newColumn(this.data.board, title).subscribe(
        data => {
          console.log(data)
          this.updating.emit(data)
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}

@Component({
  selector: 'dialog-delete-board',
  templateUrl: 'dialog-delete-board.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, FormsModule, CommonModule, ReactiveFormsModule],
})
export class DialogDeleteBoard {
  title = ''
  id = 0
  @Output() updating: EventEmitter<any> = new EventEmitter();

  constructor(
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.title = data.title
    this.id = data.id
  }

  delete() {
    this.boardService.removeBoard(this.id).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/'])
      },
      error => console.log(error)
    )
  }
}