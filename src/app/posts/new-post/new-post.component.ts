import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: string | ArrayBuffer = './assets/placeholder-image.png';
  selectedImg: any = '';
  categories: Array<any> = [];
  postForm!: FormGroup;
  post: any;
  postId!: string;
  formStatus: string = 'Add New';

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categories = val;
    });
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      permalink: ['', [Validators.required]],
      exercept: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe((val) => {
      console.log(val);
      this.postId = val.id;
      if (this.postId) {
        this.postService.loadOneData(val.id).subscribe((post) => {
          console.log(post);
          this.post = post;
          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(5)],
            ],
            permalink: [this.post.permalink, [Validators.required]],
            exercept: [
              this.post.exercept,
              [Validators.required, Validators.minLength(5)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.categoryName}`,
              [Validators.required],
            ],
            postImg: ['', [Validators.required]],
            content: [this.post.content, [Validators.required]],
          });
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(5)]],
          permalink: ['', [Validators.required]],
          exercept: ['', [Validators.required, Validators.minLength(5)]],
          category: ['', [Validators.required]],
          postImg: ['', [Validators.required]],
          content: ['', [Validators.required]],
        });
      }
    });
  }
  get fc() {
    return this.postForm.controls;
  }
  onTitleChanged($event: KeyboardEvent) {
    console.log($event);
    const element = $event.target as HTMLInputElement;
    const title = element.value;
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any) {
    console.log($event);

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let categoryData = this.postForm.value.category.split('-');
    const newPost: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      postImgPath: '',
      category: {
        categoryId: categoryData[0],
        categoryName: categoryData[1],
      },
      isFeatured: false,
      status: 'New',
      createdAt: new Date(),
      views: 0,
      exercept: this.postForm.value.exercept,
      content: this.postForm.value.content,
    };

    this.postService.uploadImage(
      this.selectedImg,
      newPost,
      this.formStatus,
      this.postId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
