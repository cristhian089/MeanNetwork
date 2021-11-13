import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RoleService } from "../../services/role.service";
import { UserService} from "../../services/user.service";
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

declare var $: any;

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  roleData: any;
  userData:any;
  messageBar: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _roleService: RoleService,
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public message: any) { 
      this.roleData = [];
      this.userData = {
        _id:this.message.id,
        name: this.message.name,
        email:this.message.email,
        role:this.message.role,
        roleId:this.message.roleId
      };
    }

  ngOnInit(): void {
    $( "#update" ).effect( "slide", "scale", 500 );
    this._roleService.listRoles().subscribe(
      (res) => {
        this.roleData = res.role;
      },
      (err)=>{
        console.log(err);
        
      }
    );
  }

  onNoClick(): void {

    this.dialogRef.beforeClosed().subscribe(res => {
      console.log(`Dialog result: ${res}`);       
      $( "#update" ).effect( "explode", "scale", 500 );   
    });
    
    this.dialogRef.close();
  }
  update(){
    this._userService.updateUser(this.userData).subscribe(
      (res) =>{
      console.log(res.user);     
      this.messageBar = "Editado exitoso";
      this.openSnackBarSuccesfull();
      this.userData={};
      this.onNoClick();
      this._router.navigate(['/listUser']);
       },
      (err) =>{
        this.messageBar = err.error;
        this.openSnackBarError();
        
      }
    );
  }
  openSnackBarError() {
    this._snackBar.open(this.messageBar, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }

  openSnackBarSuccesfull() {
    this._snackBar.open(this.messageBar, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }
  

}
