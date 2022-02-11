import { Component, Inject, OnInit } from '@angular/core';
import { CustomOption } from 'ngx-quill';
import { Post } from '../model';
import { SupabaseService } from '../service/supabase.service';
import { UtilService } from '../service/util.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import Quill from 'quill'
import BlotFormatter from 'quill-blot-formatter/dist/BlotFormatter';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('modules/imageDrop', ImageDrop);


@Component({
  selector: 'app-texteditor',
  templateUrl: './texteditor.component.html',
  styleUrls: ['./texteditor.component.scss']
})
export class TexteditorComponent implements OnInit {
  payload: string = ''
  title: string;
  modules = {}

  options: CustomOption[] = [
    {
      import: "attributors/style/size",
      whitelist: void 0,

    }
  ];

  constructor(private util: UtilService, private supabase: SupabaseService,
    public dialogRef: MatDialogRef<TexteditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
      dialogRef.disableClose = true;
      this.modules = {
        imageDrop: true,
        blotFormatter: {
          // empty object for default behaviour.
        },

        'toolbar': {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video'],                         // link and image, video
            ['formula']
          ],

        }
      }
     }

  ngOnInit(): void {
    this.title = this.util.getTitle()?.getValue()
    this.payload = this.data['payload']
  }

  onSubmit(){
     let post: Post = {
      title: this.title,
      payload: this.util.post.getValue()
    }
    if(this.data['payload']?.length >0){
      this.supabase.updatePost(this.util.getIdItem().getValue(),this.title,this.payload).then(res =>{console.log(res)})
    }else{
      this.supabase.createPost(post).then(res =>{
      })

    }
    this.supabase.getTitle()
    this.dialogRef.close();
    this.util.post.next(this.payload)

  }

  onChange(){
    this.util.post.next(this.payload)
  }




}
