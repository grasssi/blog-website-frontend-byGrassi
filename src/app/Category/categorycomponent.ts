import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesModel } from 'src/app/interfaces/categories-model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-Category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  CatogoryForm = new FormGroup({
    name: new FormControl(''),

  })

  @Input() categoryId: string;
  @Input() bloggerName: string;
  @Input() bloggerId: string;

  sectionTitle: string;
  categories: CategoriesModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    currentCategoryId: 'all'
  }


  constructor(
    private _categoryService: CategoryService,
    private cateService: CategoryService,
    private _route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (this.bloggerName) {
      this.sectionTitle = this.bloggerName + "'s";
    } else {
      this.sectionTitle = 'Blog'
    }

    if (!this.bloggerId) {
      this.bloggerId = 'all';
    }

    if (!this.categoryId) {
      this.categoryId = 'all';
    }

    this._route.params.subscribe((params) => {

      if (!params.categoryId) {
        this.categories.currentCategoryId = 'all';
      } else {
        this.categories.currentCategoryId = params.categoryId;
      }
    });

    this.getCategorizedBlogsCount();
  }

  getCategorizedBlogsCount() {
    this.categories.loading = true;
    this.categories.error = null;

    this.categories.sub = this._categoryService.getCategorizedBlogCount(this.bloggerId)
      .subscribe((res: any) => {

        this.categories.items = res;
        this.categories.items.forEach(c => {
          this.categories.totalBlogs += c.count;
        });
        this.categories.loading = false;
        this.categories.sub.unsubscribe();

      }, err => {

        this.categories.error = err;
        this.categories.loading = false;
        this.categories.sub.unsubscribe();

      })
  }

  addCategory() {
    //with Services
    console.log(this.CatogoryForm.value)
    this.cateService.addcategory(this.CatogoryForm.value).subscribe((response: any) => {
      this.router.navigate(['/write_blog']);
    },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
