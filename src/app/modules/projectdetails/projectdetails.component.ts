import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PaginationData } from './model/paginationData';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectdetailsService } from './projectdetails.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-projectdetails',
  templateUrl: './projectdetails.component.html',
  styleUrls: ['./projectdetails.component.scss'],
})
export class ProjectdetailsComponent implements OnInit {
  public dropdownListbuyerType = [
    { type: 'Engineering' },
    { type: 'Product' },
    { type: 'Sales' },
    { type: 'Others' },
  ];
  donutChart: Chart | any;
  chartData: any;
  public arr = ['Engineering', 'Product', 'Sales', 'Others'];
  designation: any = [];
  department: any = '';
  budget: any = '';
  location: any = '';
  id: any;
  projName: string = '';
  public limit!: number;
  public offset!: number;
  public selectedDesignation: any = [];
  public dropdownSettings: any;
  public totalRecords: any;
  public paginatioData: PaginationData = new PaginationData();

  public colors: any = ['#FF6384', '#36A2EB', '#FFCE56', '#EEEF50'];
  public tableData: any = [];

  public editBudget: boolean = false;
  public totalBudget = 0;
  public totalBudget2 = 0;
  public totalUsed = 0;

  modalRef: any;
  constructor(
    private ngbModalService: NgbModal,
    private router: Router,
    public service: ProjectdetailsService,
    public toaster: ToastrService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.designation = [];
    this.location = '';
    this.budget = '';
    this.department = '';
    this.getparams();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'type',
      textField: 'type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
    };
    this.budget = 10;
    this.initiateChart();
  }
  public openPopUp(PopUpComponent: any) {
    this.designation = [];
    this.location = '';
    this.budget = '';
    this.department = '';
    this.modalRef = this.ngbModalService.open(PopUpComponent, {
      size: 'lg',
      centered: true,
    });
  }

  createWorkforce() {
    this.service
      .createDetails({
        projectId: this.id,
        designation: this.designation,
        department: this.department[0].type,
        location: this.location,
        budget: this.budget,
        memberName: JSON.parse(localStorage.getItem('user') || '').firstName,
      })
      .subscribe((response) => {
        if (response.code === 200) {
          this.toaster.success(response.data.status);
          this.modalRef.close();
          this.getDetails();
        } else {
          this.toaster.error(response.data.status);
        }
      });
  }

  getparams() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        console.log(params, JSON.parse(params['data']).id);

        if (JSON.parse(params['data']).id) {
          this.id = JSON.parse(params['data']).id;
          this.projName = JSON.parse(params['data']).name;
        }
      }
    });
  }

  getDetails() {
    this.service
      .getDetails(
        {
          limit: this.limit,
          offset: this.offset,
        },
        this.id
      )
      .subscribe((response: any) => {
        if (response.code == 200) {
          this.tableData = response.data.projectWorkforceDetail;
          this.chartData = response.data.data;
          this.totalUsed = response.data.totalBudget;
          this.totalBudget = this.totalBudget2 = response.data.total;
          // if (this.totalBudget < this.totalUsed) {
          //   this.totalBudget = this.totalUsed;
          //   this.updateBudget();
          // }
          console.log(this.tableData);

          this.totalRecords = response.data.totalRecords;
          this.initiateChart();
        } else {
          this.toaster.error(response.data.status);
        }
      });
  }
  initiateChart() {
    Chart.register(...registerables);

    if (this.donutChart) {
      this.donutChart.destroy();
    }

    const ctx = document.getElementById('myDonutChart') as HTMLCanvasElement;
    console.log(this.chartData);
    let total = this.totalUsed;
    let records = this.totalRecords;
    this.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [...this.arr],
        datasets: [
          {
            data: [
              this.chartData['Engineering'] || 0,
              this.chartData['Product'] || 0,
              this.chartData['Sales'] || 0,
              this.chartData['Others'] || 0,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#EEEF50'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#EEEF50'],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%', // For creating the donut hole
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
      plugins: [
        {
          id: 'customCenterText',
          beforeDraw: function (chart) {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
            const linesOfText = [
              `Rs. ${total}`,
              'Used',
              `Positions:${records}`,
            ];

            ctx.restore();
            const fontSize = 12; // Use a numeric value for font size
            ctx.font = `${fontSize}px sans-serif`;
            ctx.textBaseline = 'middle';

            ctx.textAlign = 'center'; // Center text horizontally

            // Calculate the total height of all text lines
            const lineHeight = fontSize * 1.2; // Adjust line spacing
            const totalTextHeight = linesOfText.length * lineHeight;

            // Calculate the starting Y position
            const startY = (height - totalTextHeight) / 2;

            // Draw each line of text
            linesOfText.forEach((line, index) => {
              const textX = width / 2;
              const textY = startY + index * lineHeight + fontSize / 2;

              ctx.fillText(line, textX, textY);
            });

            ctx.save();
          },
        },
      ],
    });
  }

  onPaginationChange(paginationData: PaginationData) {
    this.paginatioData = paginationData;
    console.log(paginationData);
    console.log(this.paginatioData);
    this.limit = this.paginatioData.rowsPerPage;
    if (this.paginatioData.pageNumber >= 1)
      this.offset = (this.paginatioData.pageNumber - 1) * this.limit;
    else this.offset = 0;

    this.getDetails();
  }
  onDesignationChange(event: any) {
    this.selectedDesignation = [event];
  }
  onDesignationDeChange(event: any) {
    this.selectedDesignation = [];
  }

  handleBack() {
    this.router.navigateByUrl('/home/Projects');
  }
  openEditBudget() {
    this.editBudget = !this.editBudget;
  }
  updateBudget() {
    this.service
      .editBudget({
        projectId: this.id,
        budget: this.totalBudget,
      })
      .subscribe((response) => {
        if (response.code === 200) {
          this.editBudget = false;
          this.totalBudget2 = this.totalBudget;
          this.getDetails();
        }
      });
  }
  updateBudget2() {
    this.service
      .editBudget({
        projectId: this.id,
        budget: this.totalBudget2,
      })
      .subscribe((response) => {
        if (response.code === 200) {
          if (response.data.responseMessage)
            this.toaster.success(response.data.responseMessage);
          this.editBudget = false;
          this.totalBudget = this.totalBudget2;
          this.getDetails();
        }
      });
  }
}
