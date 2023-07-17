export interface Post {
  title: string;
  permalink: string;
  category: {
    categoryId: string;
    categoryName: string;
  };
  postImgPath: string;
  isFeatured: boolean;
  createdAt: Date;
  status: string;
  views: number;
  exercept: string;
  content: string;
}
