import 'rxjs/add/operator/toPromise';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import 'rxjs/add/operator/share'
import 'rxjs/add/operator/map'




@Injectable()
export class ProfesseurProvider {

  results: any;
  constructor(private http:HttpClient, private api:Api) {
  }

  login(accountinfo) {

    
  }

}
