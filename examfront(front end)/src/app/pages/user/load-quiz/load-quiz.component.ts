import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
catId:any
quizzes:any
  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params:any)=>{this.catId=params.catId
    
    
      if(this.catId==0){
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{this.quizzes=data
         
        },(error:any)=>{"Error in loading all quizzes"})
        
              }
              else{
                this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
                  (data:any)=>{this.quizzes=data},(error:any)=>{alert("Error in loading data")}
                )
              }
    })
    this._route.params.forEach(param =>{
      this.catId = param['catId']})

  }


}
