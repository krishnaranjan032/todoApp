import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})

export class HttpService{

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string){
        const postData: Post =  { title: title, content: content }
        this.http
      .post<{ name: string }>( // Add type annotation for the expected response
        'https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
    }

    fetchPosts(){
        return this.http.get<{ [key: string]: Post }>( // Add type annotation for the expected response
      'https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json'
    )
    .pipe(
      map(responseData => {
        const postArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        // console.log(postArray)
        return postArray;
      })
    )
   
    }
}