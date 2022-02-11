import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './service/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {



  constructor(private supabaseservice: SupabaseService){
    //this.supabaseservice.signIn('','').then(res => {sessionStorage.setItem('id',res.user.id)})

  }

ngOnInit(): void {
  console.log(localStorage.length)


}

  createCookie(){
    console.log(document.cookie.length)

  }


}
