import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../_model/blog';
import { User } from '../_model/user';
import { UserserviceService } from '../_sevicse/userservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  flag: boolean = false;
  flag2: boolean = false;
  blogs: Blog[];
  blogs1: Blog[];
  itemTemp: Blog;
  user: User = JSON.parse(localStorage.getItem('current_user'));
  fd: FormData;

  constructor(public userserve: UserserviceService, public router: Router) {}

  ngOnInit(): void {
    this.userserve.getAllBlogs().subscribe((a) => {
      if (a.length == 0) {
        alert('there is no blogs');
      } else {
        console.log(a);
        this.blogs = a;
        this.blogs1 = a;
      }
    });
  }

  done(t) {
    t.click();
  }

  change(e, t2) {
    var file = e.target.files[0];
    var reader = new FileReader();
    this.fd = new FormData();
    this.fd.append('file', file, file.name);

    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      t2.src = content;
    };
  }

  Save(t22,t2,t33) {
    if (this.fd != null) {
      this.userserve.EditeUser(this.user._id, this.fd).subscribe((a) => {
        
        this.userserve.getUserById(this.user._id).subscribe(b=>{

          t22.src=b.image;
          t33.src=b.image;
          t2.src="/assets/change.jpg"

        })
      },
      err=>{
        console.log(err);
      });
    } 
  }

  delete(id: string) {
    console.log(id);

    this.userserve.deleteBlog(id).subscribe((a) => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/UserProfile']);
      });
    });
  }

  
  search(title) {
    
     this.userserve.searchBlog(title.target.value).subscribe((a) => {
        if (a.length != 0) this.blogs = a;
       else this.blogs = this.blogs1;
      
      console.log(a);
     });
  }

  edite(e, item, r, r1) {
    e.style.display = 'block';
    this.itemTemp = item;
    r.value = item.title;
    r1.value = item.body;
  }

  close(e) {
    e.style.display = 'none';
  }

  saveEdite(r, r1, e) {
    this.itemTemp.title = r.value;
    this.itemTemp.body = r1.value;
    this.userserve
      .editeBlog(this.itemTemp._id, this.itemTemp)
      .subscribe((a) => {
        e.style.display = 'none';
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/UserProfile']);
          });
      });
  }

  home() {
    this.router.navigateByUrl('home');
  }
}
