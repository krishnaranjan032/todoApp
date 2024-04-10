// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-http',
//   templateUrl: './http.component.html',
//   styleUrls: ['./http.component.css']
// })


// export class HttpComponent implements OnInit {
//   loadedPosts = [];

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchPosts();
//   }

//   onCreatePost(postData: { title: string; content: string }) {
//     // Send Http request
//     this.http
//       .post(
//         'https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json',
//         postData
//       )
//       .subscribe(responseData => {
//         console.log(responseData);
//       });
//   }

//   onFetchPosts() {
//     // Send Http request
//     this.fetchPosts();
//   }

//   onClearPosts() {
//     // Send Http request
//   }

//   private fetchPosts(){
//     this.http.get('https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json')
//     .pipe(map(responseData => {
//       const postArray = [];
//       for(const key in responseData){
//         postArray.push({ ...responseData[key], id: key })
//       }
//       return postArray
//     }))
//     .subscribe(posts => {
//       console.log(posts)
//     })
//   }
// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];

  isFetching: boolean = false;
  error: string = '';
  errorSub: Subscription ;
  

  constructor(private http: HttpClient, private httpService: HttpService ) {
    this.errorSub = new Subscription(); 
  }

  ngOnInit() {
    this.errorSub = this.httpService.error.subscribe(errorMessage => {this.error = errorMessage})
    this.isFetching = true;
    
    this.httpService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    // send http request
    this.httpService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true;
    this.httpService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message
    });
  }

  onClearPosts() {
    // Clear loadedPosts array
    this.httpService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  onHandleError(){
    this.error = ''
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }
}
