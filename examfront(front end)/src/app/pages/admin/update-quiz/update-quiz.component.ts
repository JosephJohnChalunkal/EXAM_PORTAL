import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { QuizService } from 'src/app/Services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _category:CategoryService,private _router:Router) { }
qId=0
quiz:any;
categories:any
  ngOnInit(): void {
//this.qId=this._route.snapshot.params.w

this._route.params.forEach(param =>
	this.qId = param['qid']
  
);
//alert(this.qId)
this._quiz.getQuiz(this.qId).subscribe(
  (data:any)=>{
    this.quiz=data;
    console.log(this.quiz)
  },
  (error:any)=>{
    console.log(error)
  }
)
this._category.categories().subscribe((data:any)=>{this.categories=data},(error:any)=>alert('error in loading categories'))
}

public updateData(){
  this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{Swal.fire('Success !!','quiz updated','success').then((e)=>{this._router.navigate(['/admin/quizzes'])})}
  ,(error:any)=>{Swal.fire('Error','error in updating quiz','error')}
  )
}

}
