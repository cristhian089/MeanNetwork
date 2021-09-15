import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private env: string;
  constructor(private _http: HttpClient, private _router: Router) { 
    this.env = environment.APP_URL;
  }

  registerRole(role: any) {
    return this._http.post<any>(this.env + 'role/registerRole', role);
  }
  
  listRole(name: string) {
    return this._http.get<any>(this.env + 'role/listRole/' + name);
  }
  listRoles() {
    return this._http.get<any>(this.env + 'role/listRole' );
  }
  deleteRole(user: any){
    return this._http.put<any>(this.env + 'role/deleteRole', user);
  }
}
