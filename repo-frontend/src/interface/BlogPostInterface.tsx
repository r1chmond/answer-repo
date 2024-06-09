interface BlogPost {
  id: number;
  category: string;
  author: string;
  connection_platform: string;
  connect_author: string;
  title: string;
  content: string;
  images: string[];
  date_posted: string;
  time_posted: string;
}

export default BlogPost;
