import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
messages:any[]=[]
friends:any[]=[]
teams:any[]=[]
firstEntry=true
gettingTeams=false
currentUser:any={slug:'1'}
@ViewChild("menuModal")
menuModal!: ElementRef;
teamsNotFriends=false
constructor(private modalService: NgbModal,private cs:ChatService) { }

ngOnInit(): void {
      // this.cs.getFriends(this.currentUser.slug).subscribe((res)=>{
      //   this.friends=res
      // })
     this.friends=this.cs.getFriends(this.currentUser.slug)
  }


  showFriends(){
    this.firstEntry=true
    this.teamsNotFriends=false
  }
  showTeams(){
    this.firstEntry=true
    if(!this.gettingTeams){
      this.gettingTeams=true
      // this.cs.getTeams(this.currentUser.slug).subscribe((res)=>{
      //   this.teams=res
      // })
      this.teams=this.cs.getTeams(this.currentUser.slug)
    }

    this.teamsNotFriends=true

  }
  showMenuContent(){
    this.modalService.open(this.menuModal)
    let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    let modalContent=(<HTMLElement>modalContents[0])
  
    modalContent.style.marginTop="0px"
    modalContent.style.width="400px"
    modalContent.style.height="100%"
  
    let x=document.getElementsByTagName("ngb-modal-window");
  
    let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    y.style.maxWidth="400px"
    y.style.top="0px"
    y.style.margin="0px"
    y.style.height="100%"
    y.style.position='absolute'
    // y.style.animation="example"
    // y.style.animationDuration=".5s"
  
    }
  
  addMessage(e:any,textarea:HTMLTextAreaElement){
    // this.cs.addMessage().subscribe(res=>{
    //   console.log(res)
    // })
    let content=textarea.value.trim()
    textarea.value=''
    textarea.style.height='44px'
    
  }
  messageInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
        
  }
  getPersonalMessages(slug:any){
    // this.cs.getPersonalMessages(slug).subscribe((res)=>{
    //   this.messages=res
    // })
    this.firstEntry=false
    this.messages=this.cs.getPersonalMessages(slug)
  }
  getTeamMessages(team_id:any){
    // this.cs.getTeamMessages(team_id).subscribe((res)=>{
    //   this.messages=res
    // })
    this.firstEntry=false

    this.messages=this.cs.getTeamMessages(team_id)
  }

  deleteMessage(i:any){
    // this.cs.deleteMessage(this.messages[i].id).subscribe((res)=>{
    //   console.log(res)
    // })
    this.messages=this.messages.filter((m:any)=>m.id!=this.messages[i].id)
     
 }
 showClass2Message(i:any){
  if(i!==0)
      if(!this.myMessage(i)&&!this.myMessage(i-1))   
          return true
      else
          return false  
  else
     return false
}
showClassMessage(i:any){
  if(i!==0)
      if((this.messages[i].sender.slug==this.messages[i-1].sender.slug))    
        return true
      else
          return false
 else
     return false
}

myMessage(i:any){
  return this.messages[i].sender.slug==this.currentUser.slug
}
messageBeforClass(i:any){
  return this.myMessage(i)&&!this.showClassMessage(i)
}
messageAfterClass(i:any){
 return (!this.myMessage(i))&&!this.showClass2Message(i)
}


  hideTimesIcon(e:any){

    e.target.lastChild.hidden=true
 
   }
   showTimesIcon(e:any){
    e.target.lastChild.hidden=false
   }

  yesterday(date:any){
    let now=new Date();
    let month31=[1,3,5,7,8,10,12]
    let month=Number.parseInt(date.substring(5,7));
    let day=Number.parseInt(date.substring(8,19));
    let thisMonth=now.getMonth()+1;
    let thisDay=now.getDate()
    let beginningOfYear=((month-thisMonth)==11)&&day==31&&thisDay==1;
    let february=( month==2&&(day==29||day==28)&&thisDay==1)
    let bigMonth=(month in month31)&&day==31&&thisDay==1
    let smallMonth=!(month in month31)&&month!=2&&day==30&&thisDay==1
    return beginningOfYear||( ( (month-thisMonth)==-1 )&&(february||bigMonth||smallMonth) ) ;
  }
  getDate(date:string){
    let now=new Date()
    let year=Number.parseInt(date.substring(0,4)) 
    let month=Number.parseInt(date.substring(5,7))
    let day=Number.parseInt(date.substring(8,10))
    let thisMonth=now.getMonth()+1
    let thisDay=now.getDate()
    let thisYear=now.getFullYear()
    let returnValue=date.substring(0,10)

    if(year<thisYear)
        return returnValue
    else if(year==thisYear)
    {
       if(month<thisMonth)
          {
            console.log('m')
             if(this.yesterday(date))
                 return "Yesterday"
             else
                 return returnValue
          }  
       else if(month==thisMonth)
       {
          if(day<thisDay)
          {
            if((day-thisDay)==-1)
               return "Yesterday"
            else
               return returnValue
 
          }
          else if(day==thisDay)
             return "Today"
          else
             return returnValue
 
          
       }
       else
            return returnValue
 
 
    }
    else{
       return returnValue
    }
    
 }

  showDate(i:number){
    if(i===0)
       return true
    else
    {
       if(this.messages[i].date.substring(0,10)!==this.messages[i-1].date.substring(0,10))
         return true
      else
         return false
    }
    
  }
 

}
