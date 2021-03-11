import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../_model/blog';
import { Comment } from '../_model/comment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }


  add(fd:FormData){
    return this.http.post<User>("http://localhost:3000/user/",fd)
  }

  userLogin(user:User){
    return this.http.post<User>("http://localhost:3000/user/login",user);
  }

  EditeUser(id,fd:FormData){

    return this.http.patch<User>("http://localhost:3000/user/"+id,fd);
  }

  getAllBlogs(){
    return this.http.get<Blog[]>("http://localhost:3000/blog");
  }

  GetAllBlogs(){
    return this.http.get<Blog[]>("http://localhost:3000/blog/all")
  }

  getBlogsById(id){

    return this.http.get<Blog[]>("http://localhost:3000/blog/"+id);

  }

  addBlog(fd:FormData)
  {
    return this.http.post<Blog>("http://localhost:3000/blog/",fd);
  }

  getUsers(){
    return this.http.get<User[]>("http://localhost:3000/user/");
  }

  followUser(id:string){
    return this.http.post<any>("http://localhost:3000/user/follow/"+id,null)
  }

  getUserById(id:string){

    return this.http.get<User>("http://localhost:3000/user/"+id);
  }

  deleteBlog(id:string){
    return this.http.delete<Blog>("http://localhost:3000/blog/"+id);
  }

  searchBlog(title:string){
    return this.http.get<Blog[]>("http://localhost:3000/blog/title/"+title);
  }

  editeBlog(id:string,blog:Blog){

    return this.http.patch<Blog>("http://localhost:3000/blog/"+id,blog);
  }

  addcomment(comment:Comment){
    return this.http.post<Comment>("http://localhost:3000/user/comment/",comment);
  }

  getCommentsById(id){

    return this.http.get<Comment[]>("http://localhost:3000/user/comments/"+id);
  }

  Unfollow(id){

    return this.http.post<any>("http://localhost:3000/user/unfollow/"+id,null)

  }

  

}
