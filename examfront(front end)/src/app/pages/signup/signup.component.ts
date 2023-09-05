import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }
public user={
  username:'',
  password:'',
  firstName:'',
  lastName:'',
  email:'',
  phone:''
}
  ngOnInit(): void {
  }
  formSubmit(){
   
   if(this.user.username==''||this.user==null){
     //alert("fill the form completely")
     this.snack.open("Username is required!!",'',{duration:3000,verticalPosition:'top',horizontalPosition:'right'})
   }
   else{
    console.log(this.user);
   }
   this.userService.addUser(this.user).subscribe(
     (data:any)=>{ console.log(data);
    // alert('success') }
    Swal.fire(data.firstName+' you have done your registration Successfully','your user Id is '+data.id,'success')},
     (error)=>{
       console.log(error);
     //  alert("something went wrong")
     this.snack.open('something went wrong !!','',{duration:3000,}) 
     }
   )
  }
}