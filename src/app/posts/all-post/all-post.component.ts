import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  /**
   *
   *
   */

  posts: Array<any> | undefined;
  constructor(private postService: PostsService) {}
  ngOnInit(): void {
    this.postService.loadData().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  onDelete(id: string, postImgPath: string) {
    this.postService.deleteImage(id, postImgPath);
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = { isFeatured: value };
    this.postService.markFeatured(id, featuredData);
  }
}
