import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { Post } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  post: Post = {
    id: 0,
    poster: {id: 0, type: ''},
    poster_data: {name: '', image: ''},
    title: '',
    content: '',
    images: [''],
    date: new Date(),
    like: {likes: 0, isLiked: false},
    share: {shares: 0, isShared: false}
  }


  constructor(private route: ActivatedRoute, private ps: PostService, private athleteService: AthleteService, private trainerService: TrainerService) { 
    this.getPost()
  }

  ngOnInit(): void {
    
  }

  getPost(){
    let post_id = this.route.snapshot.paramMap.get('id') as any
    this.ps.getPostById(post_id).subscribe(res => {
      let r = res as any
      let poster = {id: 0, type: ''}
      let poster_data = {name: '', image: ''}
      if(r.profile){
        poster.id = r.profile
        poster.type = 'profile'
        this.athleteService.getProfileById(poster.id).subscribe(res => {
          poster_data.name = (res as any).first_name + ' ' + (res as any).last_name
          poster_data.image = (res as any).image
        })
      } else if(r.trainer) {
        poster.id = r.trainer
        poster.type = 'trainer'
        this.trainerService.getTrainerById(poster.id).subscribe(res => {
          poster_data.name = (res as any).page_name
          poster_data.image = (res as any).image
        })
      }
      let like = {likes: 0, isLiked: false}
      this.ps.getLikes(r.id).subscribe((res) => {
        like.likes = (res as any).likes
        like.isLiked = (res as any).value === 'Like'? true : false
      })
      let share = {shares: 0, isShared: false}
      this.ps.getShares(r.id).subscribe((res) => {
        share.shares = (res as any).shares
        share.isShared = (res as any).isShared
      })
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
      this.post = p
    }, 
    err => {
      alert('an error occured during get posts')
    })
  }

}
