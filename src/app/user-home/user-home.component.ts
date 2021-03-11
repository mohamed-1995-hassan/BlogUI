import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../_model/blog';
import { User } from '../_model/user';
import { UserserviceService } from '../_sevicse/userservice.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  blogs: Blog[];
  users: User[];
  user: User;

  constructor(public router: Router, public userserv: UserserviceService,private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);  
     this.location.onPopState(() => {
  history.pushState(null, null, window.location.href);
});  
  }

  ngOnInit(): void {
    this.userserv.GetAllBlogs().subscribe((a) => {
      this.blogs = a;
    });

    var json = localStorage.getItem('current_user');
    var model = JSON.parse(json);
    this.user = model;

    this.userserv.getUsers().subscribe((a) => {
      this.users = a;
      console.log(this.users);
      this.display_Users();
    });
  }

  display_Users() {
    for (var i = 0; i < this.users.length; i++) {
      var _flage: boolean = true;
      if (this.users[i]._id == this.user._id) {
        this.users[i].flage = 'my account';
        this.user = this.users[i];
      } else {
        for (var j = 0; j < this.user.Following.length; j++) {
          if (this.users[i]._id == this.user.Following[j]) {
            this.users[i].flage = 'following';
            _flage = false;
            console.log('quly');
          }
        }

        if (_flage) {
          this.users[i].flage = 'follow';
        }
      }
    }
    console.log(this.users);
  }

  openFollowing(e, item) {
    var ev = e.target.tagName;
    if (ev == 'IMG' || ev == 'P' || ev == 'DIV') {
      localStorage.setItem('selected', JSON.stringify(item));
      this.router.navigateByUrl('FollowingProfile');
    }
  }

  open_profile() {
    this.router.navigateByUrl('UserProfile');
  }

  createBlog() {
    this.router.navigateByUrl('createBlog');
  }

  followuser(e, item: User) {
    if (e.target.tagName == 'BUTTON') {
      this.userserv.followUser(item._id).subscribe((a) => {
        item.flage = 'following';
        this.user.Following.push(item._id);
        console.log(item._id);
        localStorage.setItem('current_user', JSON.stringify(this.user));
      });
    }
  }
}
