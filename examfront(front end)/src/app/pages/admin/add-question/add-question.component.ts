import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/Services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
 
qId:any
qTitle:any
question:any=
{quiz:{

},
content:'',
option1:'',
option2:'',
option3:'',
option4:'',
answer:''
}
  constructor(private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this._route.params.forEach(param =>
      this.qId = param['qid']
    )    
    this._route.params.forEach(param =>
      this.qTitle = param['title']
    ) 
    this.question.quiz['qId']=this.qId;
    
  }
  formSubmit(){
    if(this.question.content.trim()==''|| this.question.content==null){
      return
    }
    if(this.question.option1.trim()==''|| this.question.option2==null){
      return
    }
    if(this.question.option2.trim()==''|| this.question.option2==null){
      return
    }
    if(this.question.answer.trim()==''|| this.question.answer==null){
      return
    }
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{Swal.fire("Succes","Question Added","success");
     console.log(this.question);
     

    },
    (error:any)=>{Swal.fire('Error','Error in adding question','error')})

  
  }

}
