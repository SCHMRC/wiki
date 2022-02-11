import { Component, OnInit } from '@angular/core';
import { Profile, SupabaseService } from '../service/supabase.service';
import { UtilService } from '../service/util.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Post } from './../model/index'
import { TexteditorComponent } from '../texteditor/texteditor.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { LoginComponent } from './../login/login.component'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  data: Post[] = []
  value: string;

  constructor(private router: Router, private supabase: SupabaseService, private util: UtilService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.supabase.getTitle()?.then(res =>{
      let datasource = []
      res.data.forEach(element => {

        element.title
        datasource.push(element)
      })
      this.util.datasource.next(datasource)


    })
    this.util.datasource?.subscribe(data=>{
      this.data = data
    })

  }

  getPost(form){

    this.supabase.getPost(form.value)
  }
  get session(){
    return sessionStorage.getItem('id')
  }

  showItem(id: number){
    let x = this.util.show.getValue()
    x? this.util.show.next(false): this.util.show.next(true)
    this.util.setIdItem(id)
  }
  openDialog(): void {
    this.util.title.next('')
    const dialogRef = this.dialog.open(TexteditorComponent, {
      width: '100%',
      height: '70%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.supabase.getTitle().then(res =>{
        let datasource = []
        res.data.forEach(element => {

          element.title
          datasource.push(element)
        })
        this.util.datasource.next(datasource)


      })

    });
  }

  dialogDelete(id){
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.supabase.getTitle().then(res =>{
        let datasource = []
        res.data.forEach(element => {
          element.title
          datasource.push(element)
        })
        this.util.datasource.next(datasource)


      })

    });

  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent,{
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.supabase.signIn()

    });

  }
  logout(){
    this.supabase.signOut().then(res=>{
      sessionStorage.clear()
      this.router.navigateByUrl('')


    })
  }



}
