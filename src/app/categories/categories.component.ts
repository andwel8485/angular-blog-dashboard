import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray: Array<any> = [];
  categoryData!: string;
  categoryId!: string;
  formStatus: string = 'Add';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit = (formData: NgForm) => {
    let categoryData: Category = {
      category: formData.value,
    };
    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else {
      this.categoryService.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();
  };

  onEdit(id: string, categoryData: string) {
    this.categoryId = id;
    this.categoryData = categoryData;
    this.formStatus = 'Edit';
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
