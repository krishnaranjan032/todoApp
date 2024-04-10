import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})

export class HttpService{
    error = new Subject<string>();

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
      }, error => {
        this.error.next(error.message)
      });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams.append('print', 'pretty');
        searchParams.append('custom', 'key');
        return this.http.get<{ [key: string]: Post }>( // Add type annotation for the expected response
      'https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({'Custom-Header': 'Hello'}),
        // params: new HttpParams().set('print', 'pretty')   // to add single parameters
        params: searchParams    // to add multiple params parameters
      }
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
      }),
      catchError(errorRes => {
        return throwError(errorRes)
      })
    )
   
    }

    deletePosts(){
        return this.http.delete('https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json')
    }
}