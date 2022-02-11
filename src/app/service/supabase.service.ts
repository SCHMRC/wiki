import { Injectable } from '@angular/core';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import {AuthChangeEvent, createClient, Session, SupabaseClient, UserCredentials} from '@supabase/supabase-js';
import {environment} from "./../../environments/environment";
import { UtilService } from './util.service';
import { Post } from './../model/index'
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';

export interface Profile {
  username: string;
  website: string;
}
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor(private util: UtilService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  }

  get user() {
    return this.supabase.auth.user();
  }

  get session() {
    return this.supabase.auth.session();
  }

  createUser(): Promise<any>{
    let param: UserCredentials = {
      email: 'schiavo.marco05@gmail.com',
      password: 'Pa55word'
    }
    return this.supabase.auth.signUp(param)
  }

  createPost(post: Post): PostgrestFilterBuilder<any>{
    return this.supabase.from('personal-wiki').insert(post)

  }

  getPost(id: number){
    let post: Post
    this.supabase.from('personal-wiki').select('*').then(res =>
      res.data.forEach(element => {
        if(element['id'] == id){
          this.util.title.next(element['title'])
          this.util.responcePost.next(element['payload'])
        }
      })
    )
  }

  delete(id: any): PostgrestFilterBuilder<any>{
    return this.supabase.from('personal-wiki').delete().match({id:id})
  }

  getTitle(): PostgrestFilterBuilder<any>{
    return this.supabase.from('personal-wiki').select('id, title, created_at')
  }

  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signIn({email: email,password: password});
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  updatePost(id,title, payload): PostgrestFilterBuilder<any> {

    return this.supabase.from('personal-wiki').update({payload: payload, title: title}).match({id: id})

  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path);
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage
      .from('avatars')
      .upload(filePath, file);
  }
}
