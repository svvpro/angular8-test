import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterializeService} from "../../shared/classes/materialize.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  imagePreview: string | ArrayBuffer;
  isNew: boolean = true;
  image: File;
  categoryId: string;
  form: FormGroup;


  @ViewChild('uploadForm', {static: false}) uploadFormRef: ElementRef;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null),
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          return this.categoryService.getById(params['id']);
        } else {
          return of(null);
        }
      })
    ).subscribe((category) => {
      if(category) {
        console.log(category);
        this.form.setValue({
          name: category.name
        });
        this.isNew = false;
        this.categoryId = category._id;
        this.imagePreview = category.imgSrc;
        MaterializeService.updateTextFields();
      } else {
        this.form.reset({
          name: null
        });
        this.isNew = true;
      }
    })
  }

  showUploadForm(): void {
    this.uploadFormRef.nativeElement.click();
  }

  upploadImage(event): void {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  submit(): void {
    let obs;
    if(this.isNew) {
      obs = this.categoryService.add(this.form.value.name, this.image);
    } else {
      obs = this.categoryService.upload(this.categoryId, this.form.value.name, this.image);
    }

    obs.subscribe(
      () => {
        this.router.navigate(['/categories']);
        MaterializeService.toast('Category updated successfully');
      }
    )
  }

  delete(): void {
    this.categoryService.delete(this.categoryId).subscribe(
      () => {
        this.router.navigate(['/categories']);
        MaterializeService.toast('Category sucessfully deleted');
      }
    )
  }
}
