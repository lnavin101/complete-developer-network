import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../shared/models/user.model'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserList(){
    return this.http.get<User[]>(environment.apiUrl + '/list');
  }

  deleteUser(userId: string){
    return this.http.delete<any>(environment.apiUrl + '/' + userId);
  }
}
