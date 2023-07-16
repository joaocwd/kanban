import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private api = env.api

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
      .post(`${this.api}/column/movetask/${boardId}`, { taskId, newColumnId }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  newColumn(boardId: number, title: string) {
    return this.http
      .post(`${this.api}/column/${boardId}`, { title }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  updateColumn(boardId: number, columnId: number, title: string) {
    return this.http
      .put(`${this.api}/column/${boardId}/${columnId}`, { title }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  deleteColumn(boardId: number, id: number) {
    return this.http
      .delete(`${this.api}/column/${boardId}/${id}`, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }
  
  updateBoard(boardId: number, name: string) {
    console.log('bid', boardId)
    return this.http
      .put(`${this.api}/boards/${boardId}`, { name }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  removeBoard(boardId: number) {
    return this.http
      .delete(`${this.api}/boards/${boardId}`, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  newTask(columnId: number, title: string, description: string = '', color: string = '#592fff') {
    return this.http
      .post(`${this.api}/task`, { title, description, color, columnId }, {
        headers: {
          "Authorization": localStorage.getItem('token')!
        }
      })
  }

  getTask(taskId: number) {
    return this.http.get(`${this.api}/task/get/${taskId}`, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }

  newSubtasks(taskId: number, text: string) {
    return this.http.post(`${this.api}/task/${taskId}`, {
      text
    }, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }

  removeTask(taskId: number) {
    return this.http.delete(`${this.api}/task/${taskId}`, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }

  removeSubtask(taskId: number, id: number) {
    return this.http.delete(`${this.api}/task/${taskId}/${id}`, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }

  changeChecked(taskId: number, id: number, checked: boolean) {
    return this.http.put(`${this.api}/task/${taskId}/${id}`, {
      checked
    }, {
      headers: {
        "Authorization": localStorage.getItem('token')!
      }
    })
  }
}
