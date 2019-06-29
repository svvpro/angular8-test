import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../shared/services/category.service";
import {Category} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
