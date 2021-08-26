import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AthleteService } from 'src/app/services/athlete.service';
import { Post, Team } from 'src/app/services/my-data.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-posts',
  templateUrl: './team-posts.component.html',
  styleUrls: ['./team-posts.component.css']
})
export class TeamPostsComponent implements OnInit {

  constructor(private modalService: NgbModal, private teamService: TeamService, private athleteService: AthleteService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  posts: Post[] = []

  team_id: any

  ngOnInit(): void {
    let team_id = this.route.snapshot.paramMap.get('id') as any
    this.team_id = team_id
    this.getTeamPosts(team_id)
  }

  goToTopScroll(){
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  page: number = 1
  last_page: boolean = false

  getTeamPosts(team_id: any){
    if(this.last_page)return
    this.teamService.getTeamPosts(team_id, this.page).subscribe(res => {
      if((res as any).next){
        this.page++
      }
      else {
        this.last_page = true
      }
      for(let r of (res as any).posts){
        let poster = {id: 0, type: ''}
        let poster_data = {name: '', image: ''}
        if(r.profile){
          poster.id = r.profile
          poster.type = 'profile'
          this.athleteService.getProfileById(poster.id).subscribe(res => {
            poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
            poster_data.image = (res as any).image
          })
        }
        let like = {likes: 0, isLiked: false}
        // this.ps.getLikes(r.id).subscribe((res) => {
        //   like.likes = (res as any).likes
        //   like.isLiked = (res as any).value === 'Like'? true : false
        // })
        let share = {shares: 0, isShared: false}
        // this.ps.getShares(r.id).subscribe((res) => {
        //   share.shares = (res as any).shares
        //   share.isShared = (res as any).isShared
        // })
        let p: Post = {
          id: r.id,
          poster: poster,
          poster_data: poster_data,
          title: r.title,
          content: r.content,
          images: [r.image],
          date: r.created,
          like: like,
          share: share
        }
        this.posts.push(p)
      }
    }, 
    err => {
      console.log(err)
      alert('an error occured during get posts')
    })
  }

  @ViewChild("images")
  images!: ElementRef<HTMLInputElement>;

  imagesURLs: any[] = [];

  postImage: any

  storeImages(){
    this.imagesURLs=[]
    let files=(<FileList>this.images.nativeElement.files)
    this.postImage = files[0]
    for (let i=0; i<files.length; i++){
      let url = URL.createObjectURL(files[i]);
      console.log(this.sanitizer.bypassSecurityTrustUrl(url))     
      this.imagesURLs.push(this.sanitizer.bypassSecurityTrustUrl(url))
    }  
  }


  publishPostWithAI(form: NgForm){
    let values = form.value
    const formData = new FormData();
    formData.append('team', this.team_id)
    formData.append('title', values.title);
    formData.append('content', values.content);
    if(this.postImage)
      formData.append('image', this.postImage);
    this.teamService.createPost(formData).subscribe(res => {
      console.log(res)
      if((res as any).rejected){
        alert((res as any).msg)
        return
      } 
      else {
        let p = (res as any)
        let poster = {id: 0, type: ''}
        let poster_data = {name: '', image: ''}
        if(p.profile){
          poster.id = p.profile
          poster.type = 'profile'
          this.athleteService.getProfileById(poster.id).subscribe(res => {
            poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
            poster_data.image = (res as any).image
          })
        }
        let like = {likes: 0, isLiked: false}
        this.teamService.getLikes(p.id).subscribe((res) => {
          like.likes = (res as any).likes
          like.isLiked = (res as any).value === 'Like'? true : false
        })
        let share = {shares: 0, isShared: false}
        this.teamService.getShares(p.id).subscribe((res) => {
          share.shares = (res as any).shares
          share.isShared = (res as any).isShared
        })
        let post: Post = {
          id: p.id,
          poster: poster,
          poster_data: poster_data,
          title: p.title,
          content: p.content,
          images: [p.image],
          date: p.created,
          like: like,
          share: share
        }
        this.posts.unshift(post)
        this.modalService.dismissAll()
      }
    })
  }


  closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getMorePosts(){
    this.getTeamPosts(this.team_id)
  }
}
