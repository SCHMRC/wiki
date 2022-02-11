import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component
import { TexteditorComponent } from './texteditor/texteditor.component';
import { LayoutViewComponent } from './layout-view/layout-view.component';
import { ItemComponent } from './layout-view/item/item.component';
import { TreeComponent } from './tree/tree.component';
import { LoginComponent } from './login/login.component';

//guard
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/view-wiki', pathMatch: 'full'},
  {path: 'login-wiki', component: LoginComponent},
  {path: 'view-wiki', component: LayoutViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const COMPONENTS = [
  ItemComponent,
  TexteditorComponent,
  TreeComponent,
  LoginComponent,
  LayoutViewComponent

]
