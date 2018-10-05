import { Component, OnInit, Input } from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input() message: string;
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}