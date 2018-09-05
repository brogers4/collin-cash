import { Component, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { DevicesProvider } from '../../providers/devices/devices';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('addTicketToBank', [
      state('active', style({
        transform: 'translate3d(0,-100vh,0) rotate(1080deg) scale(1) translateZ(0)',
        opacity: '0'
      })),
      state('finished', style({
        transform: 'translate3d(0,150px,0) rotate(90deg) scale(2) translateZ(0)',
        opacity: '0'
      })),
      state('inactive', style({
        transform: 'translate3d(0,0,0) rotate(90deg) scale(2) translateZ(0)',
        opacity: '1'
      })),
      transition('inactive => active', animate('1s ease-out')),
      transition('active => finished', animate('0s')),
      transition('finished => inactive', animate('0.5s ease-in'))
    ]),
    trigger('totalTicket',[
      state('active', style({
        filter: 'brightness(1.2)',
        transform: 'rotate3d(1,-1,1,45deg) scale(3.2)'
      })),
      state('inactive', style({
        filter: 'brightness(1)',
        transform: 'rotate3d(1,-1,1,35deg) scale(3)'
      })),
      transition('inactive <=> active', animate('0.9s ease-in-out'))
    ])
  ]
})
export class HomePage {

  bankTotal: number = 0;
  chaChingFX = new Audio('../../assets/audio/Cha_Ching_Register.mp3');
  holePunchFX = new Audio('../../assets/audio/Hole_Punch.mp3');

  _tickets = [
    {'value': 1, 'class': 'cc-ticket-green', state: 'inactive'},
    { 'value': 5, 'class': 'cc-ticket-red', state: 'inactive' },
    { 'value': 10, 'class': 'cc-ticket-blue', state: 'inactive' },
    { 'value': 25, 'class': 'cc-ticket-yellow', state: 'inactive' },
    { 'value': 100, 'class': 'cc-ticket-orange', state: 'inactive' },
  ]
  _totalTicketState = "inactive";

  constructor(
    public renderer: Renderer,
    public navCtrl: NavController,
    public devicesProvider: DevicesProvider
  ) {

    this.devicesProvider.devices.subscribe( devices => {
      // Do something with the devices
    });

  }

  addToBank = function(val: number, index: number){
    this._tickets[index].state = 'active';
    this._totalTicketState = 'active';
    this.holePunchFX.currentTime = 0;
    this.holePunchFX.play();
    // ticket.classList.add("pocket-ticket-animation");
    // this.renderer.addClass("pocket-ticket-animation");
    // this.renderer.set
    
  }

  finishTicketToBank = function(val: number, index: number, event: any){
    if(event.fromState == "inactive" && event.toState == "active"){
      this.chaChingFX.currentTime = 0;
      this.chaChingFX.play();
      this._tickets[index].state = "finished";
      this.bankTotal += val;
    } else if(event.fromState == "active" && event.toState == "finished"){
      this._tickets[index].state = "inactive";
      this._totalTicketState = 'inactive';
    }
  }

}
