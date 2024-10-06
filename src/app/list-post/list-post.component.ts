import { Component, OnInit } from '@angular/core';

interface Post {
  title: string;
  abstract: string;
  image: string;
}
@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
 
 
 
  ngOnInit(): void {
  
  
  }
}
