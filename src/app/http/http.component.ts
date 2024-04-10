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


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface Post {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http
      .post<{ name: string }>( // Add type annotation for the expected response
        'https://angular-tutorial-6a450-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    // Clear loadedPosts array
    this.loadedPosts = [];
  }

  private fetchPosts() {
    this.http.get<{ [key: string]: Post }>( // Add type annotation for the expected response
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
    .subscribe(posts => {
      this.loadedPosts = posts; // Assign fetched posts to loadedPosts array
    });
  }
}
