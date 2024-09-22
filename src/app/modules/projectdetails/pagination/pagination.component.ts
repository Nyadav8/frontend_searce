import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PaginationData } from '../model/paginationData';
// import { LocalstorageService } from '../../../service/LocalstorageService/localstorage.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('firstButtonName') firstBtnName: string = 'First';
  @Input('lastButtonName') lastBtnName: string = 'Last';
  @Input('nextButtonName') nextBtnName: string = 'Next';
  @Input('preButtonName') preBtnName: string = 'Pre';
  @Input('isPageSizeAllow') isPageSizeAllow: boolean = true;
  @Output('onChange')
  onChange: EventEmitter<PaginationData> = new EventEmitter<PaginationData>();

  @Input('totalRecords')
  public totalRecords!: number;
  @Input('pageNumber')
  public currentPageNumber: number = 1;

  @Input('pageSize')
  public pageSize!: number;
  public totalPage!: number;
  public jumpToPage!: number;
  @Input('paginatioData')
  public pagingData!: PaginationData;

  constructor() {}
  ngOnInit() {
    if (!this.pagingData) this.pagingData = new PaginationData();
    this.initPage();
    this.getList();
    this.countTotalPage();
  }
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'pagingData': {
            this.updateCurrentPageValue();
            break;
          }
          case 'totalRecords': {
            this.countTotalPage();
            break;
          }
        }
      }
    }
  }
  updateCurrentPageValue() {
    this.currentPageNumber = this.pagingData.pageNumber;
  }

  getList() {
    if (this.pagingData) {
      this.pagingData.pageNumber = this.currentPageNumber;
      this.pagingData.rowsPerPage = this.pageSize;
    }
    this.jumpToPage = this.currentPageNumber;
    this.onChange.emit(this.pagingData);
  }

  initPage() {
    // if(this.){
    //   this.pageSize = this.pageSize
    // }
    if (!this.pageSize) {
      this.pageSize = 10;
    }

    this.pagingData.pageNumber = this.currentPageNumber;
    this.pagingData.rowsPerPage = this.pageSize;
  }
  countTotalPage() {
    this.totalPage = Math.ceil(this.totalRecords / this.pageSize);
    this.jumpToPage = this.currentPageNumber;
    if (this.currentPageNumber > this.totalPage && this.totalPage !== 0) {
      this.currentPageNumber = this.currentPageNumber - 1;
      console.log('count total page');
      this.getList();
    }
  }

  onJumpToPageClick() {
    if (this.jumpToPage < 1) {
      this.jumpToPage = 1;
      this.currentPageNumber = 1;
      console.log('onjump');
      this.getList();
      return;
    }

    if (this.jumpToPage > this.totalPage) {
      this.jumpToPage = this.totalPage;
      this.currentPageNumber = this.totalPage;
      console.log('onjump');
      this.getList();
      return;
    }

    this.currentPageNumber = Number(this.jumpToPage);
    console.log('onjump');
    this.getList();
  }

  onPageSizeChange() {
    this.currentPageNumber = 1;
    this.countTotalPage();
    console.log('onpagesizechange');
    this.getList();
  }
  onPageNoClick(pgNo: number) {
    this.currentPageNumber = pgNo;
    this.getList();
  }

  onRefreshClick() {
    console.log('on refresh');
    this.getList();
  }

  getPageArray(): Array<number> {
    return Array(this.totalPage)
      .fill(0)
      .map((e, i) => i + 1);
  }

  onFirstClick() {
    if (this.currentPageNumber <= 1) {
      return;
    }
    this.currentPageNumber = 1;
    console.log('onfirst');
    this.getList();
  }

  onPreClick() {
    if (this.currentPageNumber == 1) {
      this.currentPageNumber = this.totalPage;
      console.log('onpre');
      this.getList();
      return;
    }

    this.currentPageNumber = this.currentPageNumber - 1;
    console.log('onpre');
    this.getList();
  }

  onNextClick() {
    if (this.currentPageNumber == this.totalPage) {
      this.currentPageNumber = 1;
      console.log('onNext');
      this.getList();
      return;
    }

    this.currentPageNumber = this.currentPageNumber + 1;
    console.log('onNext');
    this.getList();
  }

  onLastClick() {
    if (this.currentPageNumber == this.totalPage) {
      return;
    }

    this.currentPageNumber = this.totalPage;
    console.log('onLastClick');
    this.getList();
  }
}
