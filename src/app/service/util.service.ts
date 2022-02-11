import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  itemId: BehaviorSubject<number> = new BehaviorSubject(null)
  show: BehaviorSubject<boolean> = new BehaviorSubject(true)
  post: BehaviorSubject<string> = new BehaviorSubject(null)
  title: BehaviorSubject<string> = new BehaviorSubject(null)
  responcePost: BehaviorSubject<string> = new BehaviorSubject(null)
  datasource: BehaviorSubject<Post[]> = new BehaviorSubject([])
  constructor() { }
  setIdItem(id: number) {
    this.itemId.next(id)
  }
  getIdItem(): BehaviorSubject<number>{
    return this.itemId
  }
  getTitle(): BehaviorSubject<string>{
    return this.title
  }
}
