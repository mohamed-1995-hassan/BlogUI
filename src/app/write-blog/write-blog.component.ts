import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../_model/blog';
import { UserserviceService } from '../_sevicse/userservice.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
})
export class WriteBlogComponent implements OnInit {
  blog: Blog = new Blog('','', '', new Date(),'','');
  fd: FormData;

  constructor(public blogserv: UserserviceService,public router:Router) {}

  ngOnInit(): void {}

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

  addBlog() {
    this.fd.append('title',this.blog.title.toString());
    this.fd.append('body',this.blog.body.toString());
    this.blogserv.addBlog(this.fd).subscribe((a) => {

      alert("post added");
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/createBlog']);
      });

  
    });
  }
}
