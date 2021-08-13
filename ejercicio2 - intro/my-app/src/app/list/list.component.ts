import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import Brew from '../interfaces/brew';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
   brews: any;
   
   /*Brew = {
    address_2: '',
    address_3: '',
    brewery_type: '',
    city: '',
    country: '',
    county_province: '',
    created_at: '',
    id: '',
    latitude: '',
    longitude: '',
    name: '',
    obdb_id: '',
    phone:'',
    postal_code: '',
    state: '',
    street: '',
    updated_at: '',
    website_url: '',
   }; */

  constructor(private _http: HttpService) {
 
   }

  ngOnInit(): void {
    this._http.getBeer().subscribe( data => {
      this.brews = data;
      console.log(this.brews);
    })
  }

}
