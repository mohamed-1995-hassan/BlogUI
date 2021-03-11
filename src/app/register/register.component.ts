import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_model/user';
import { UserserviceService } from '../_sevicse/userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User=new User('','','','','',null,null,'','');
  fd:FormData ;

  constructor(public userService:UserserviceService,public router:Router) {

   }
  ngOnInit(): void {
  }
  done(t){
    t.click()
  }

  change(e,t2){
var file = e.target.files[0]; 
var reader=new FileReader();
this.fd=new FormData()
this.fd.append('file',file,file.name);

reader.readAsDataURL(file);
reader.onload=readerEvent=>{
var content = readerEvent.target.result;
t2.src = content;
}

}
addOne(){

this.fd.append('username',this.user.username);
this.fd.append('password',this.user.password);
this.fd.append('firstname',this.user.firstname);


  this.userService.add(this.fd).subscribe(

    a=>{
     // console.log(a);
      this.router.navigateByUrl("login");
      
      
    },
    err=>{
   console.log(err)
    }
  )
}

}
