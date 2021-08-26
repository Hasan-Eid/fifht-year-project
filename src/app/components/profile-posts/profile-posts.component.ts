import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AthleteService } from 'src/app/services/athlete.service';
import { Post } from 'src/app/services/my-data.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {

  posts: Post[] = []

  athlete_id: any

  constructor(private ps: PostService, private athleteService: AthleteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.athlete_id = this.route.snapshot.paramMap.get('id') as any
    this.getAthletePosts(this.athlete_id)
  }

  goToTopScroll(){
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  page: number = 1
  last_page: boolean = false

  getAthletePosts(athlete_id: any){
    if(this.last_page)return
    this.ps.getAthletePosts(athlete_id, this.page).subscribe(res => {
      if((res as any).next){
        this.page++
      }
      else {
        this.last_page = true
      }
      for(let r of (res as any).results){
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
        this.posts.push(p)
      }
    }, 
    err => {
      console.log(err)
      alert('an error occured during get posts')
    })
  }

  getMorePosts(){
    this.getAthletePosts(this.athlete_id)
  }

}
