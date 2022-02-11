import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../service/supabase.service';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss']
})
export class LayoutViewComponent implements OnInit {
  show: boolean = true;
  payload: string

  constructor(private util: UtilService, private supabase: SupabaseService) { }

  ngOnInit(): void {
    this.util.show.subscribe(show=>{
      console.log(show)
        this.show = true
        setTimeout(() =>{
        this.util.getIdItem().subscribe(id =>{
          this.supabase.getPost(id)
          this.util.responcePost.subscribe(payload =>{
            this.payload = payload

          })

        })
        this.show = false},200)
    })
  }

}
