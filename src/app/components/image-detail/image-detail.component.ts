import { Component, OnInit } from '@angular/core';
import { FlickrService } from 'src/app/service/flickr.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  image!: any;
  tag!: string;
  constructor(private flickrService: FlickrService) {}

  ngOnInit() {}

  search(event: any) {
    console.log('clicked');

    this.flickrService
      .search_tag(this.tag)
      .toPromise()
      .then((res) => {
        this.image = res[0];
        console.log(this.image);
      });
  }
}
