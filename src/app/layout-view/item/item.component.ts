import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stringify } from 'querystring';
import { SupabaseService } from 'src/app/service/supabase.service';
import { UtilService } from 'src/app/service/util.service';
import { TexteditorComponent } from 'src/app/texteditor/texteditor.component';



@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, AfterViewInit {
  payload: string = ''
  equation: string = '\\frac{a}{b}';
  x: any
  constructor(private util: UtilService, public dialog: MatDialog, private supabase: SupabaseService) { }

  ngOnInit(): void {
    this.util.responcePost?.subscribe(res => {
      this.payload = res
    })
  }

  ngAfterViewInit(): void {

  }

  update(){
    const dialogRef = this.dialog.open(TexteditorComponent, {
      width: '100%',
      height: '50%',
      data: {payload: this.util.responcePost?.getValue()},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.supabase.getTitle().then(res =>{
        let datasource = []
        res.data.forEach(element => {

          element.title
          datasource.push(element)
        })
        this.util.datasource?.next(datasource)



      })

    });

  }



}
