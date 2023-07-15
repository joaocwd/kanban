import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private api = `http://localhost:3000`

  constructor(
    private http: HttpClient
  ) { }

  getBoard(id: number) {
    return this.http.get(`${this.api}/boards/${id}`, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }

  moveTaskColumn(taskId: number, newColumnId: number, boardId: number) {
    return this.http
      .post(`http://localhost:3000/column/movetask/${boardId}`, { taskId, newColumnId }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  newColumn(boardId: number, title: string) {
    return this.http
      .post(`http://localhost:3000/column/${boardId}`, { title }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  removeBoard(boardId: number) {
    return this.http
      .delete(`http://localhost:3000/boards/${boardId}`, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  newTask(columnId: number, title: string, color: string = '#592fff') {
    return this.http
      .post(`http://localhost:3000/task`, { title, color, columnId }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }
}
