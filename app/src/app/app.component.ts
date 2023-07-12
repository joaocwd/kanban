import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class AppComponent {
  title = 'app';
  board = true;

  constructor(
    private router: Router
  ) {}

  shouldDisplayLayout(): boolean {
    const currentUrl = this.router.url;
    return currentUrl !== '/login';
  }
}
