import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PreferitiPage } from './preferiti.page';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    canActivate:[AuthGuard],
    path: '',
    component: PreferitiPage,
    canActivateChild:[AuthGuard]

  }

];

@NgModule({
  declarations: [PreferitiPage],
  imports: [CommonModule, RouterModule.forChild(routes),FormsModule],
})
export class UsersModule {}

