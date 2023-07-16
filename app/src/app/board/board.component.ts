import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';

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
        if (data === null) return
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

    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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

  getCorFonte(corDeFundo: string): string {
    // Obtenha os valores RGB da cor de fundo
    const r = parseInt(corDeFundo.substr(1, 2), 16);
    const g = parseInt(corDeFundo.substr(3, 2), 16);
    const b = parseInt(corDeFundo.substr(5, 2), 16);

    // Calcule o valor de luminosidade usando a fórmula adequada
    const luminosidade = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Retorne a cor da fonte correspondente com base na luminosidade
    return luminosidade > 0.5 ? 'black' : 'white';
  }

  openNewTask() {
    const dialogRef = this.dialog.open(DialogNewTask, {
      data: { columns: this.columns }
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data.sort((a: any, b: any) => a.id - b.id);
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openNewColumn() {
    const dialogRef = this.dialog.open(DialogNewColumn, {
      data: { board: this.selectedBoardId }
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data.sort((a: any, b: any) => a.id - b.id);
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteBoard() {
    const dialogRef = this.dialog.open(DialogDeleteBoard, {
      data: { id: this.selectedBoardId, title: this.boardName }
    });

    dialogRef.componentInstance.updating.subscribe((data) => {
      this.columns = data.sort((a: any, b: any) => a.id - b.id);
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openTasks(columnId: number, taskId: number) {
    const dialogRef = this.dialog.open(DialogTasks, {
      data: {
        columnId,
        taskId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      const id = parseInt(this.route.snapshot.paramMap.get('id')!);
      this.getBoard(id)
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
    description: new FormControl(''),
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
      this.boardService.newTask(this.taskForm.value.columnId, this.taskForm.value.title, this.taskForm.value.description, this.taskForm.value.color).subscribe(
        data => {
          console.log(data)
          this.updating.emit(data)
        },
        error => console.log(error)
      )
    }
  }
}

interface SubTarefa {
  id?: number
  text: string;
  checked: boolean;
}

@Component({
  selector: 'tasks',
  templateUrl: 'tasks.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
})
export class DialogTasks implements OnInit {
  taskTitle = ''
  taskDescription = ''
  subtasks: any
  
  subForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
  });

  @ViewChild('inputRef') inputElement!: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getSubtasks()
    this.inputElement.nativeElement.focus()
  }

  getSubtasks() {
    const columnId = this.data.columnId;
    const taskId = this.data.taskId;
    this.boardService.getTask(taskId).subscribe(
      (data: any) => {
        console.log(data)
        this.taskTitle = data.title
        this.taskDescription = data.description === '' ? 'Não há descrição.': data.description
        this.subtasks = data.subtasks
      },
      error => {
        console.log(error)
      }
    )
  }

  removeTask() {
    const taskId = this.data.taskId
    this.boardService.removeTask(taskId).subscribe(
      (data: any) => {
        console.log(data)
      },
      error => console.log(error)
    )
  }

  adicionarTarefa(): void {
    const taskId = this.data.taskId;
    if (this.subForm.valid) {
      const text = this.subForm.value.text
      this.boardService.newSubtasks(taskId, text).subscribe(
        data => {
          this.subtasks = data
          this.subForm.reset()
          this.inputElement.nativeElement.focus()
        },
        error => console.log(error)
      )
    }
    console.log(this.subtasks);
  }

  removeSubtask(id: number) {
    const taskId = this.data.taskId;
    this.boardService.removeSubtask(taskId, id).subscribe(
      (data: any) => {
        this.subtasks = data.subtasks
      },
      error => console.log(error)
    )
  }

  alterarConclusao(tarefa: SubTarefa): void {
    const taskId = this.data.taskId;
    tarefa.checked = !tarefa.checked;
    this.boardService.changeChecked(taskId, tarefa.id!, tarefa.checked).subscribe(
      data => {console.log(data)},
      error => console.log(error)
    )
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
  ) { }

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