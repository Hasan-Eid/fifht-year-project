import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

