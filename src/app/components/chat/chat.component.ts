import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from 'src/app/services/team.service';
import { FriendshipService } from 'src/app/services/friendship.service';
import { AthleteService } from 'src/app/services/athlete.service';
import { Message, MyDataService, Profile, Team, TeamMessage } from 'src/app/services/my-data.service';

import { io, Socket } from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  myProfile: Profile = MyDataService.myProfile

  friend !: Profile

  team !: Team

  select: string = '' // 'friend' OR 'team'

  socket!: Socket;

  show_menu: boolean = true

  messages:Message[] = []
  team_messages:TeamMessage[] = []
  friends:Profile[] = []
  teams:Team[] = []


  firstEntry = true
  gettingTeams = false
  currentUser:any = {id: 1}
  @ViewChild("menuModal")
  menuModal!: ElementRef;
  teamsNotFriends=false

  DateDiff = {

    now: function(){
      return new Date()
    },

    toDate: function(date: Date){
      return new Date(date)
    },

    inDays: function(d1: Date, d2: Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1: Date, d2: Date) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1: Date, d2: Date) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1: Date, d2: Date) {
        return d2.getFullYear()-d1.getFullYear();
    },

    diff: function(d1: Date, d2: Date){
      if(this.inDays(d1, d2) < 7) return this.inDays(d1, d2) + ' d'
      else if(this.inWeeks(d1, d2) < 5) return this.inWeeks(d1, d2) + ' w'
      else if(this.inMonths(d1, d2) < 12) return this.inMonths(d1, d2) + ' m'
      else return this.inYears(d1, d2) + ' y'
    }
}

  constructor(private modalService: NgbModal, private cs: ChatService, private teamService: TeamService, private friendshipService: FriendshipService, private athleteService: AthleteService){ 
    friendshipService.getFriendsProfiles()
    
    this.socketInit().then(socket => {
      this.socketOn()

      let me = {slug: this.myProfile.slug}
      this.socket.emit('go-online', JSON.stringify(me))

      this.getMyTeams()
      // for(let team of this.teams){
      //   console.log(team)
      //   let team_data = {team_id: team.id}
      //   this.socket.emit('join-team', JSON.stringify(team_data))
      // }
    })
  }

  ngOnInit(): void {
     this.friends = FriendshipService.friends
  }

  goToTopScroll(){
    //
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  socketInit(){
    return new Promise((resolve, reject) => {
      this.socket = io('http://127.0.0.1:8000/');
      if(!this.socket)reject('socket error')
      resolve(this.socket)
    })
  }

  socketOn(){
    // client-side
    this.socket.on("connect", () => {
      console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
    });

    this.socket.on("disconnect", () => {
      console.log(this.socket.id); // undefined
    });

    this.socket.on('personal-message', data => {
      let sender = {id: 0, slug: '', name: '', image: ''}
      let receiver = {id: 0, slug: '', name: '', image: ''}
      sender.id = data.sender
      this.athleteService.getProfileById(sender.id).subscribe(res => {
        sender.name = (res as any).first_name + ' ' + (res as any).last_name
        sender.image = (res as any).image
        sender.slug = (res as any).slug
      })
      receiver.id = data.receiver
      this.athleteService.getProfileById(receiver.id).subscribe(res => {
        receiver.name = (res as any).first_name + ' ' + (res as any).last_name
        receiver.image = (res as any).image
        receiver.slug = (res as any).slug
      })
      let msg: Message = {
        id: data.id, 
        sender: sender, 
        receiver: receiver,
        content: data.content, 
        date: data.timestamp
      }
      this.messages.unshift(msg)
    })

    this.socket.on('team-message', data => {
      let sender = {id: 0, slug: '', name: '', image: ''}
      sender.id = data.sender
      this.athleteService.getProfileById(sender.id).subscribe(res => {
        sender.name = (res as any).first_name + ' ' + (res as any).last_name
        sender.image = (res as any).image
        sender.slug = (res as any).slug
      })
      let msg: TeamMessage = {
        id: data.id, 
        sender: sender, 
        team_id: this.team.id,
        content: data.content, 
        date: data.timestamp
      }
      this.team_messages.unshift(msg)
    })
  }

  addMessage(e:any, textarea:HTMLTextAreaElement){
    let content=textarea.value.trim()
    textarea.value=''
    textarea.style.height='44px'  
    // socket.io
    if(this.select === 'friend'){
      let msg_data = {
        sender: this.myProfile.slug, 
        receiver: this.friend.slug,
        content: content
      }
      this.socket.emit('personal-message', JSON.stringify(msg_data))
    } 
    else if(this.select === 'team'){
      let msg_data = {
        sender: this.myProfile.id, 
        team: this.team.id,
        content: content
      }
      this.socket.emit('team-message', JSON.stringify(msg_data))
    }
  }

  messageInput(textarea:HTMLTextAreaElement){
    textarea.style.height='44px'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  getPersonalMessages(slug:any, friend: Profile){
    this.select = 'friend'
    this.friend = friend
    this.messages = []
    this.team_messages = []
    this.cs.getPersonalMessages(slug).subscribe((res)=>{
      // this.messages = res as any
      let msgs = (res as any).messages
      console.log(msgs)
      msgs.forEach((e: any) => {
        let sender = {id: 0, slug: '', name: '', image: ''}
        let receiver = {id: 0, slug: '', name: '', image: ''}
        sender.id = e.sender
        this.athleteService.getProfileById(sender.id).subscribe(res => {
          sender.name = (res as any).first_name + ' ' + (res as any).last_name
          sender.image = (res as any).image
          sender.slug = (res as any).slug
        })
        receiver.id = e.receiver
        this.athleteService.getProfileById(receiver.id).subscribe(res => {
          receiver.name = (res as any).first_name + ' ' + (res as any).last_name
          receiver.image = (res as any).image
          receiver.slug = (res as any).slug
        })
        let msg: Message = {
          id: e.id, 
          sender: sender, 
          receiver: receiver,
          content: e.content, 
          date: e.timestamp
        }
        this.messages.push(msg)
      });
    })
    this.firstEntry = false
    // this.messages = this.cs.getPersonalMessages(slug)
  }

  getTeamMessages(team_id:any, team: Team){
    this.select = 'team'
    this.team = team
    this.messages = []
    this.team_messages = []
    this.cs.getTeamMessages(team_id).subscribe((res)=>{
      // this.messages = res as any
      let msgs = (res as any).messages
      msgs.forEach((e: any) => {
        let sender = {id: 0, slug: '', name: '', image: ''}
        sender.id = e.sender
        this.athleteService.getProfileById(sender.id).subscribe(res => {
          sender.name = (res as any).first_name + ' ' + (res as any).last_name
          sender.image = (res as any).image
          sender.slug = (res as any).slug
        })
        let msg: TeamMessage = {
          id: e.id, 
          sender: sender, 
          team_id: team_id,
          content: e.content, 
          date: e.timestamp
        }
        this.team_messages.push(msg)
      });
    })
    this.firstEntry=false
    // this.messages=this.cs.getTeamMessages(team_id)
  }

  getMyTeams(){
    this.teamService.getMyTeams().subscribe(res => {
      (res as any).results.forEach((e: any) => {
        let admin_data = {name: '', image: ''}
        this.athleteService.getProfileById(e.admin).subscribe(res => {
          admin_data.name = (res as any).first_name + ' ' + (res as any).last_name
          admin_data.image = (res as any).image
        })
        let team: Team = {
          id: e.id, 
          admin_id: e.admin, 
          admin_data: admin_data, 
          name: e.name, 
          description: e.description, 
          image: e.image, 
          date: e.created
        }
        this.teams.push(team)
      });
      for(let team of this.teams){
        console.log(team.id)
        let team_data = {team_id: team.id}
        this.socket.emit('join-team', JSON.stringify(team_data))
      }
    })
  }


  showFriends(){
    this.select = ''
    this.firstEntry=true
    this.teamsNotFriends=false
  }

  showTeams(){
    this.select = ''
    this.firstEntry=true
    if(!this.gettingTeams){
      this.gettingTeams=true
      // this.cs.getTeams(this.currentUser.slug).subscribe((res)=>{
      //   this.teams=res
      // })
      // this.teams=this.cs.getTeams(this.currentUser.slug)
    }
    this.teamsNotFriends=true
  }

  showMenuContent(){
    this.show_menu = !this.show_menu
    // this.modalService.open(this.menuModal)
    // let modalContents:NodeListOf<Element>=document.querySelectorAll(".modal-content")
    // let modalContent=(<HTMLElement>modalContents[0])
  
    // modalContent.style.marginTop="0px"
    // modalContent.style.width="400px"
    // modalContent.style.height="100%"
  
    // let x=document.getElementsByTagName("ngb-modal-window");
  
    // let y:HTMLDivElement=<HTMLDivElement>x[0].firstElementChild
    // y.style.maxWidth="400px"
    // y.style.top="0px"
    // y.style.margin="0px"
    // y.style.height="100%"
    // y.style.position='absolute'
    // // y.style.animation="example"
    // // y.style.animationDuration=".5s"
  
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
    if((this.messages[i].sender.id == this.messages[i-1].sender.id))    
      return true
    else
      return false
  else
     return false
}

myMessage(i:any){
  return this.messages[i].sender.id==this.myProfile.id
}

messageBeforClass(i:any){
  return this.myMessage(i)&&!this.showClassMessage(i)
}

messageAfterClass(i:any){
 return (!this.myMessage(i))&&!this.showClass2Message(i)
}


myTeamMessage(i:any){
  return this.team_messages[i].sender.id==this.myProfile.id
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

  getDate(date:Date){
    let now = new Date()
    let year=Number.parseInt(date.toString().substring(0,4)) 
    let month=Number.parseInt(date.toString().substring(5,7))
    let day=Number.parseInt(date.toString().substring(8,10))
    let thisMonth=now.getMonth()+1
    let thisDay=now.getDate()
    let thisYear=now.getFullYear()
    let returnValue = date.toString().substring(0,10)

    if(year<thisYear)
        return returnValue
    else if(year==thisYear)
    {
       if(month<thisMonth){
             if(this.yesterday(date))
                 return "Yesterday"
             else
                 return returnValue
          }  
       else if(month==thisMonth){
          if(day<thisDay){
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

//   getDate(date:string){
//     let now=new Date()
//     let year=Number.parseInt(date.substring(0,4)) 
//     let month=Number.parseInt(date.substring(5,7))
//     let day=Number.parseInt(date.substring(8,10))
//     let thisMonth=now.getMonth()+1
//     let thisDay=now.getDate()
//     let thisYear=now.getFullYear()
//     let returnValue=date.substring(0,10)

//     if(year<thisYear)
//         return returnValue
//     else if(year==thisYear)
//     {
//        if(month<thisMonth)
//           {
//             console.log('m')
//              if(this.yesterday(date))
//                  return "Yesterday"
//              else
//                  return returnValue
//           }  
//        else if(month==thisMonth)
//        {
//           if(day<thisDay)
//           {
//             if((day-thisDay)==-1)
//                return "Yesterday"
//             else
//                return returnValue
 
//           }
//           else if(day==thisDay)
//              return "Today"
//           else
//              return returnValue
 
          
//        }
//        else
//             return returnValue
 
 
//     }
//     else{
//        return returnValue
//     }
    
//  }

  showDate(i:number){
    if(i===0)
       return true
    else
    {
       if(this.messages[i].date.toString().substring(0,10)!==this.messages[i-1].date.toString().substring(0,10))
         return true
      else
         return false
    }
    
  }
 

  // goToBottom(){
  //   console.log(document.body.offsetHeight)
  //   window.scroll(0,document.body.offsetHeight);
  // }

}
