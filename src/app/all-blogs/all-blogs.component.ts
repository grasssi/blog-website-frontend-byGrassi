import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {
  color = "blue"
  searchText;
  apiUrl;
  allBlogs: AllBlogsModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    totalPages: [],
    currentPage: 0
  }

  conditionOther = false;
  otherStyles = {};

  currentCategoryId: string = 'all';

  constructor(
    private _blogService: BlogService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params) => {
      if (!params.categoryId) {
        this.currentCategoryId = 'all';
        this.getAllBlogs();
      } else {
        this.currentCategoryId = params.categoryId;
        this.getAllBlogs();

      }
    });
  }

  getAllBlogs() {

    this.allBlogs.loading = true;
    this.allBlogs.error = null;

    this.allBlogs.sub = this._blogService.getblogList('all', this.currentCategoryId)
      .subscribe((res: any) => {

        this.allBlogs.items = res.result;
        this.allBlogs.totalBlogs = res.totalBlogs;
        this.allBlogs.currentPage = res.currentPage;
        this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x, i) => i);

        for (let i = 0; i < this.allBlogs.items.length; i++) {

          if (this.allBlogs.items[i].reacts.like.length >= this.allBlogs.items[i].reacts.sad.length) 
            {
              this.color = 'green'
            }
            else if(this.allBlogs.items[i].reacts.like.length < this.allBlogs.items[i].reacts.sad.length) {
            this.color = 'blue'
          }
        
      }
        this.allBlogs.loading = false;
    this.allBlogs.sub.unsubscribe();

  }, err => {

  this.allBlogs.error = err;
  this.allBlogs.loading = false;
  this.allBlogs.sub.unsubscribe();
})
  }

changePage(page) {

  this.allBlogs.loading = true;
  this.allBlogs.error = null;

  this._blogService.getblogList('all', this.currentCategoryId, page)
    .subscribe((res: any) => {

      this.allBlogs.items = res.result;
      this.allBlogs.totalBlogs = res.totalBlogs;
      this.allBlogs.currentPage = res.currentPage;
      this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x, i) => i);

      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    }, err => {

      this.allBlogs.error = err;
      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    })
}

  public toggleOther() {
  this.conditionOther = !this.conditionOther;
  if (this.conditionOther) {
    this.otherStyles = {
      'font-style': 'italic',
      'font-weight': 'bold',
      'font-size': '24px',
      'color': 'green',
      ' box-shadow': '2px 2px 5px #e11010'
    };
  } else {
    this.otherStyles = {};
  }
}

getColor() {
  return this.color
}
getBackgroundColor(i: any): Boolean {
return i.reacts.like.length > i.reacts.sad.length ? true : false;
  }
}
