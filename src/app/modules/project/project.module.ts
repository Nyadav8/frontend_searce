import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'Projects',
    component: ProjectComponent,
  },
];

@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [ProjectService],
})
export class ProjectModule {}
