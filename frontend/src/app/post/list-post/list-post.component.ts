import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  postData: any;
  message: string = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _postService: PostService,
    private _snackBar: MatSnackBar
  ) { 
    this.postData = {};
  }


  ngOnInit(): void {
    this._postService.listPost().subscribe(
      (res) => {
        this.postData = res.post;
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  updatePost(post: any, status: string) {
    let tempStatus = post.status;
    post.status = status;
    this._postService.updatePost(post).subscribe(
      (res) => {
        post.status = status;
      },
      (err) => {
        post.status = tempStatus;
        this.message = err.error;
        this.openSnackBarError();
      }
    );
  }

  deletePost(post: any) {
    this._postService.deletePost(post).subscribe(
      (res) => {
        let index = this.postData.indexOf(post);
        if (index > -1) {
          this.postData.splice(index, 1);
          this.message = res.message;
          this.openSnackBarSuccesfull();
        }
      },
      (err) => {
        this.message = err.error;
        this.openSnackBarError();
      }
    )
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
