import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { QuestionService } from 'src/app/Services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
qid:any
questions:any
marksGot=0
correctAnswers=0
answer:any
attempted=0
isSubmit=false
timer:any
givenAnswer:any
i:any
candidate:any
  constructor(private locationSt:LocationStrategy,public login:LoginService,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {

    this.preventBackButton()
    this._route.params.subscribe((params:any)=>{this.qid=params.qid})
    this.loadQuestions()
    this.loadName()
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{this.questions=data;
      this.timer=this.questions.length*2*60
    console.log(this.questions);
    
      this.startTimer()
    },(error:any)=>{Swal.fire("Error","Error in loading questions of quiz",'error')})
  }
preventBackButton(){
  history.pushState(null,location.href)
  this.locationSt.onPopState(()=>{history.pushState(null,location.href)})
}

submitQuiz(){
  Swal.fire({
    title:'Do you want to submit the test?',
    showCancelButton:true,
    confirmButtonText:'Submit',
    denyButtonText:'Cancel Submission',
    icon:'info'
  }).then((e:any)=>{
    if(e.isConfirmed){
     this.evalQuiz()

    }
  })
}
startTimer(){
  let t=window.setInterval(()=>{if(this.timer<=0){
    this.evalQuiz()
    clearInterval(t)
  }else{
    this.timer--;
  }
},1000)
}
getFormattedTime(){
  let mm=Math.floor(this.timer/60)
  let ss=this.timer-mm*60
  return `${mm} min : ${ss} sec`
}
evalQuiz(){

  this._question.evalQuiz(this.questions).subscribe((data:any)=>{console.log(data);
    
    this.marksGot=parseFloat(Number(data.marksGot).toFixed(2))
    this.correctAnswers=data.correctAnswers
    this.attempted=data.attempted
    this.isSubmit=true
  },(error:any)=>{console.log(error);
  })
  // this.isSubmit=true
//   this.questions.forEach((q: { givenAnswer: any; answer: any; })=>{
//     if(q.givenAnswer==q.answer){
//       this.correctAnswers++
//      let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
//       this.marksGot += marksSingle;
//     }
//    if(q.givenAnswer.trim()!=''){
//      this.attempted++
//    }
    
    
//   })
//   console.log("Correct Answers:"+this.correctAnswers);
//   console.log("marks got "+this.marksGot);
}

printPage(){
  window.print()
}
loadName(){
  this.login.getCurrentUser().subscribe((data:any)=>{this.candidate=data
   console.log(this.candidate);
   })
}
}
