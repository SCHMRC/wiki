import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SupabaseService } from '../service/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private supabase: SupabaseService, private router: Router,private guard: AuthGuard) { }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
      let _username = this.form.value['username']
      let _password = this.form.value['password']
      this.supabase.signIn(_username,_password).then((res)=>{
        if(res.error == null){
          sessionStorage.setItem('id',res.user.id)
          this.router.navigateByUrl('view-wiki')
        }

      })

    }
  }



}
