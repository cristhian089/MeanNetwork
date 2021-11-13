import { Component, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';

declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  displayedColumns: string[] = ['NAME', 'EMAIL', 'ACTIONS'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  userData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.userData = {};
    this.dataSource = new MatTableDataSource(this.userData);
   }

  ngOnInit(): void {
    this._userService.listUser('').subscribe(
      (res) => {
        this.userData = res.users;
        this.dataSource = new MatTableDataSource(this.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
   
  }

  deleteUser(user: any) {

    let r = confirm("Seguro desea eliminar el usuario!");
    if (r == true) {
      this._userService.deleteUser(user).subscribe(
        (res) => {
          let index = this.userData.indexOf(user);
          if (index > -1) {
            this.userData.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.userData);
            this.message = 'Delete user';
            this.openSnackBarSuccesfull();
          }
        },
        (err) => {
          this.message = err.error;
          this.openSnackBarError();
        }
      );
      
    } else {
      console.log("no eliminamos");
      
    }
   
  }
 

  updateUser(user: any) {
    console.log(user);
   
      let dialogRef = this.dialog.open(UpdateUserComponent, {
        data: {id: user._id ,name: user.name, email: user.email, role: user.roleId.name,roleId: user.roleId._id},
        autoFocus: false,
      });
  
      /*
      dialogRef.afterOpened().subscribe(res => {
        console.log(`Dialog result: ${res}`);
          
       $( "#update" ).effect( "slide", "scale", 500 );
        
      });
      */

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  openSnackBarSuccesfull() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue'],
    });
  }

  
  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
 

}
