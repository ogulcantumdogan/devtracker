import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatNativeDateModule
 } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { DevListComponent } from './devs/dev-list/dev-list.component';

const appRoutes: Routes = [
  { path: 'users', component: UserListComponent, pathMatch: 'full'},
  { path: 'users/create', component: UserCreateComponent, pathMatch: 'full' },
  { path: 'users/edit/:id', component: UserEditComponent, pathMatch: 'full'},
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent, pathMatch: 'full'},
  { path: 'projects/create', component: ProjectCreateComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    MainNavComponent,
    HomeComponent,
    UserEditComponent,
    ProjectCreateComponent,
    DevListComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
