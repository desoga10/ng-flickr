import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface FlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  prevtag!: string;
  currPage = 1;

  constructor(private http: HttpClient) {}

  search_tag(tag: string) {
    if (this.prevtag === tag) {
      this.currPage++;
    } else {
      this.currPage = 1;
    }
    this.prevtag = tag;
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickrAPI.key}&text=${tag}&sort=relevance&format=json&nojsoncallback=1&per_page=50&page=${this.currPage}`;

    return this.http.get<FlickrOutput>(url + params).pipe(
      map((res: FlickrOutput) => {
        const urlArr: any = [];
        res.photos.photo.forEach((ph: FlickrPhoto) => {
          const photoObj = {
            url: `https://farm${ph.farm}.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}`,
            title: ph.title,
          };
          urlArr.push(photoObj);
        });
        return urlArr;
      })
    );
  }
}
