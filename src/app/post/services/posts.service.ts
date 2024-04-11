import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken} from '@angular/core';
import { Post } from '../models/post';



export const API_URL = new InjectionToken<string> ('API_URL')


@Injectable()
export class PostsService {

  constructor(
     @Inject(API_URL) public ServiceURL: string,
                      private httpClient: HttpClient,

  ) { }


 public getAllPost (){
 return this.httpClient.get<Post[]>(this.ServiceURL)
 }

}
