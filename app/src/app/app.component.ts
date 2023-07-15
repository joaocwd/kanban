import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationEnd, Router } from '@angular/router';
import { SystemService } from './system.service';
// import {
//   CdkDragDrop,
//   moveItemInArray,
//   transferArrayItem,
//   CdkDrag,
//   CdkDropList,
// } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  board = true;
  darkTheme = false;

  name = ''

  boards: any = []

  constructor(
    private router: Router,
    private system: SystemService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): any {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/login') {
          this.saveUserInfo()
        }
      }
    })
    
  }

  saveUserInfo(): void {
    const token = localStorage.getItem('token')!
    if (!token) this.router.navigate(['/login'])
    if (token) this.system.getUserData(token).subscribe(
      (data: any) => {
        this.name = data.fullName.split(' ')[0]
        this.boards = data.boards
        // console.log(data)
        // console.log(this.name, data)
      },
      error => {
        console.log('error', error)
        this.logout()
      }
    )
  }

  shouldDisplayLayout(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login';
  }

  openNewBoard() {
    const dialogRef = this.dialog.open(DialogNewBoard);

    dialogRef.componentInstance.updating.subscribe(() => {
      this.saveUserInfo()
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}

@Component({
  selector: 'dialog-new-board',
  templateUrl: 'dialog-new-board.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class DialogNewBoard {
  @Output() updating: EventEmitter<any> = new EventEmitter();
  
  boardForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private system: SystemService
  ) {}

  newBoard() {
    if (this.boardForm.valid) {
      this.system.newBoard(localStorage.getItem('token')!, this.boardForm.value.name).subscribe(
        (dados: any) => {
          console.log(dados)
          this.updating.emit();
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}