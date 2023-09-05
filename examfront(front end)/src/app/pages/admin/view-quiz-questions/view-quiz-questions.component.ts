import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }
qId:any
qTitle:any

questions:any
  ngOnInit(): void {
    
  
    this._route.params.forEach(param =>
      this.qId = param['qid'])
      this._route.params.forEach(param =>
        this.qTitle = param['title'])
        this._question.getQuestionsOfQuizAdmin
        (this.qId).subscribe((data:any)=>{
          this.questions=data
          console.log(this.questions);
          
        },
        (error:any)=>{console.log(error)})


  }
  deleteQuestion(qid:any){
Swal.fire({
  icon:'info',
  showCancelButton:true,
  confirmButtonText:'Delete',
  title:'Are you sure to delete this question?'
}).then((result:any)=>{
  if(result.isConfirmed){
    this._question.deleteQuestion(qid).subscribe((data:any)=>{
      this._snack.open('Question Deleted','',{duration:3000})
this.questions=this.questions.filter((q:any)=>q.quesId!==qid)
    },(error:any)=>{this._snack.open('Error in deleting questions','',{duration:3000})})
  }
})
  }
  

}
