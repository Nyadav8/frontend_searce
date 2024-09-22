import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from './project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  public projects: any = [];
  public projName: string = '';
  public projDes: string = '';
  public coplanner: string = '';
  modalRef: any;
  constructor(
    private ngbModalService: NgbModal,
    private router: Router,
    public service: ProjectService,
    public toaster: ToastrService
  ) {}
  ngOnInit() {
    this.projName = '';
    this.projDes = '';
    this.coplanner = '';
    this.getAllProjects();
  }

  public openPopUp(PopUpComponent: any) {
    this.projName = '';
    this.projDes = '';
    this.coplanner = '';
    this.modalRef = this.ngbModalService.open(PopUpComponent, {
      size: 'lg',
      centered: true,
    });
  }

  getAllProjects() {
    if (localStorage.getItem('user')) {
      this.service.getAllProjects({}).subscribe((response) => {
        if (response.code === 200) {
          this.projects = response.data.projectDetailsList;
        } else {
          this.toaster.error(response.message);
        }
      });
    }
  }

  routerDetails(i: any) {
    this.router.navigate(['/details/Projects'], {
      queryParams: {
        data: JSON.stringify({
          id: this.projects[i].projectId,
          name: this.projects[i].projectName,
        }),
      },
    });
  }

  createProject() {
    if (this.projName === '') {
      this.toaster.error('Project Name is required');
      return;
    }
    if (this.projDes === '') {
      this.toaster.error('Project Description is required');
      return;
    }

    this.service
      .createProject({
        projectName: this.projName,
        projectDescription: this.projDes,
        coplannerEmail: this.coplanner,
        budget: 100,
      })
      .subscribe((response) => {
        if (response.code === 200) {
          this.projects = response.data;
          this.ngbModalService.dismissAll();
          this.toaster.success(response.data.status);
          this.getAllProjects();
        } else {
          this.toaster.error(response.message);
        }
      });
  }
}
