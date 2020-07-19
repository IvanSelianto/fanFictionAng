import 'hammerjs';
import '@angular/compiler';

import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {ProfileComponent} from './profile/profile.component';
import {NewcompositionComponent} from './newcomposition/newcomposition.component';
import {ChapterComponent} from './composition/chapter/chapter.component';
import {SidenavComponent} from './composition/chapter/sidenav/sidenav.component';
import {EditsheetComponent} from './composition/chapter/editmode/editsheet/editsheet.component';
import {ReadingmodeComponent, SanitizeHtmlPipe} from './composition/readingmode/readingmode.component';
import {EditmodeComponent} from './composition/chapter/editmode/editmode.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {EditorModule} from '@tinymce/tinymce-angular';

import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {InplaceeditingComponent} from './profile/inplaceediting/inplaceediting.component';
import { CompositionComponent } from './composition/composition.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    ProfileComponent,
    NewcompositionComponent,
    ChapterComponent,
    SidenavComponent,
    EditsheetComponent,
    ReadingmodeComponent,
    EditmodeComponent,
    SanitizeHtmlPipe,
    InplaceeditingComponent,
    CompositionComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    DragDropModule,
    MatBottomSheetModule,
    ScrollingModule,
    EditorModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatTableModule,
  ],
  providers: [authInterceptorProviders, {provide: MatBottomSheetRef, useValue: {}}],
  bootstrap: [AppComponent],
  entryComponents: [EditsheetComponent],
})

export class AppModule {
}
