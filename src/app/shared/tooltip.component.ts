import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IUser } from '../users/IUser';
import { HttpProviders } from '../service/http-providers.service';
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.css']
})
export class TooltipComponent implements OnInit {
  
  @Input()
  public user:any;
  constructor() {
     
  }
  ngOnInit() {

  }
}