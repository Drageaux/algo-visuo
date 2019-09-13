import { environment } from './../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() speed = 200;
  @Output() speedChangeEvent = new EventEmitter<number>();
  @Input() sampleSize = 100;
  @Output() sampleSizeChangeEvent = new EventEmitter<number>();
  env = environment;

  constructor() {}

  ngOnInit() {}
}
