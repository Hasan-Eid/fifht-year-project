import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Post, Profile, Workout } from './my-data.service';

const uploadFileMutation = gql`
  mutation UploadMutation($file: Upload!) {
    singleUpload(file: $file) {
      url
    }
  }
`;


const myProfile=gql`
query MyProfile($slug:String!) {
  myProfile(slug:$slug) {
    slug
    last_name
    first_name
    image
    hobbies
    career
  }
}
`;

const friends=gql`
query getFriends {
  friendship{
    friends{
      last_name
      first_name
      slug
      hobbies
      career
      image
    }
  }
}
`;


@Injectable({
  providedIn: 'root'
})
export class ApolloServiceService {

  constructor(private apollo: Apollo) { }

  search_results = {
    workouts: [], 
    profiles: [], 
    posts: []
  }

  async search(keyword: string){
    new Promise((resolve, reject) => {
      this.apollo.query({
        query: gql`query ($keyword: String){
          allWorkouts(description_Icontains: $keyword){
            edges{
              node{
                id, 
                profile{id, firstName, lastName, image, hobbies, carear, created, slug}, 
                title, 
                description, 
                created
              }
            }
          }
        }`, 
        variables: {
          keyword: keyword
        }
      }).subscribe(({ data, loading }) => {
        // console.log((data as any).allWorkouts.edges)
        this.search_results.workouts = (data as any).allWorkouts.edges
      });
  
      this.apollo.query({
        query: gql`query ($keyword: String){
          allProfiles(firstName_Icontains: $keyword){
            edges{
              node{
                id, firstName, lastName, image, hobbies, carear, created, slug
              }
            }
          }
        }`, 
        variables: {
          keyword: keyword
        }
      }).subscribe(({ data, loading }) => {
        // console.log((data as any).allProfiles.edges)
        this.search_results.profiles = (data as any).allProfiles.edges
      }, 
      err => console.log);
  
      this.apollo.query({
        query: gql`query ($keyword: String){
          allPosts(content_Icontains: $keyword){
            edges{
              node{
                id, 
                profile{id, firstName, lastName, image, hobbies, carear, created, slug}, 
                title, 
                content, 
                image, 
                created
              }
            }
          }
        }`, 
        variables: {
          keyword: keyword
        }
      }).subscribe(({ data, loading }) => {
        // console.log((data as any).allPosts.edges)
        this.search_results.posts = (data as any).allPosts.edges
      });
    }).then(() => {
      return this.search_results
    }) 
  }




  fileUpload(fileslist:any){
    let file=fileslist.files.item(0)
    console.log( file)
    return   this.apollo.mutate<any>({
             mutation: uploadFileMutation,
             variables: {
                  file:file
                },
             context: {
                  useMultipart: true
                }
             })
   }


  getFriends(){
    return   this.apollo.watchQuery<any>({
               query:friends
              })
  }

  getMyProfile(slug:string){
    return   this.apollo.watchQuery<any>({
      query:myProfile,
      variables:{slug:slug}
     })
  }

}

