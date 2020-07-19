import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {NewcompositionComponent} from './newcomposition/newcomposition.component';
import {ChapterComponent} from './composition/chapter/chapter.component';
import {ReadingmodeComponent} from './composition/readingmode/readingmode.component';
import {EditmodeComponent} from './composition/chapter/editmode/editmode.component';
import {CompositionComponent} from './composition/composition.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent},
  {
    path: 'composition/:compositionId',
    component: CompositionComponent,
    children: [{
      path: 'chapter',
      component: ChapterComponent,
      children:
        [{
          path: ':chapterId/editmode',
          component: EditmodeComponent
        }
        ]
    }]
  }, {
    path: 'composition/:compositionId',
    component: CompositionComponent,
    children:
      [
        {path: 'chapter/:chapterId/readingmode', component: ReadingmodeComponent},
      ],
  },
  {
    path: 'newcomposition',
    component: NewcompositionComponent
  },
  {
    path: 'newcomposition/:compositionId',
    component: NewcompositionComponent
  },
  {path:  '**', redirectTo: 'home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
