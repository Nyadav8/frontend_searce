import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectdetailsComponent } from './projectdetails.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { ProjectdetailsService } from './projectdetails.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'Projects',
    component: ProjectdetailsComponent,
  },
];
@NgModule({
  declarations: [ProjectdetailsComponent, PaginationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  exports: [PaginationComponent],
  entryComponents: [PaginationComponent],
  providers: [ProjectdetailsService],
})
export class ProjectdetailsModule {}
