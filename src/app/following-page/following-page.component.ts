import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../_model/blog';
import { Comment } from '../_model/comment';
import { User } from '../_model/user';
import { UserserviceService } from '../_sevicse/userservice.service';

@Component({
  selector: 'app-following-page',
  templateUrl: './following-page.component.html',
  styleUrls: ['./following-page.component.css'],
})
export class FollowingPageComponent implements OnInit {
  flag: boolean[] = [];
  flag2: boolean[] = [];
  user: User = JSON.parse(localStorage.getItem('selected'));
  current_user: User = JSON.parse(localStorage.getItem('current_user'));
  blogs: Blog[] = [];
  comment: Comment = new Comment('', new Date(), this.current_user._id, '');
  commingUsers: User[] = [];
  commingComments: Comment[] = [];

  constructor(public userserv: UserserviceService, public router: Router) {
    this.userserv.getBlogsById(this.user._id).subscribe((a) => {
      this.blogs = a;
    });

    for (var i = 0; i < this.blogs.length; i++) {
      this.flag.push(false);
      this.flag2.push(false);
    }
  }

  ngOnInit(): void {}

  addComment(c, id) {
    if (this.user.flage == 'follow') {
      alert('you can not comment on the post');
    } else if (c.value != '') {
      this.comment.blogId = id;
      this.comment.body = c.value;

      this.userserv.addcomment(this.comment).subscribe((a) => {
        console.log(a);
        this.comment.body = '';
        c.value = '';
      });
    }
  }

  seeComments(id, i) {
    this.commingUsers = [];
    this.flag2[i] = !this.flag2[i];
    if (this.flag2[i] == true) {
      this.userserv.getCommentsById(id).subscribe((a) => {
        this.commingComments = a;
        this.getAllUsers(a);
        console.log(this.commingUsers);
        console.log(this.commingComments);
      });
    }
  }

  getAllUsers(b: Comment[]) {
    for (var i = 0; i < b.length; i++) {
      this.userserv.getUserById(b[i].userId).subscribe((a) => {
        this.commingUsers.push(a);
      });
    }
  }

  unfollow() {
    this.userserv.Unfollow(this.user._id).subscribe((a) => {
      for (var i = 0; i < this.current_user.Following.length; i++) {
        if (this.user._id == this.current_user.Following[i]) {
          this.current_user.Following.splice(i, 1);
          localStorage.setItem("current_user",JSON.stringify(this.current_user));
        }
      }
      this.user.flage = 'follow';
    });
  }

  follow() {
    this.userserv.followUser(this.user._id).subscribe((a) => {
      this.current_user.Following.push(this.user._id);
      localStorage.setItem("current_user",JSON.stringify(this.current_user));
      this.user.flage = 'following';
    });
  }

  heart(item: Blog) {
    if (this.user.flage != 'follow') {
      item.love = !item.love;
      this.userserv.editeBlog(item._id, item).subscribe((a) => {
        console.log('hello');
      });
    }
    else{alert("follow "+this.user.username+" first")}
  }
  alb(item: Blog) {
    if (this.user.flage != 'follow') {
      item.love = !item.love;
      this.userserv.editeBlog(item._id, item).subscribe((a) => {
        console.log('hello2');
      });
    }
    else{alert("follow "+this.user.username+" first")}
  }
}
