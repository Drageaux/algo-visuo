import { environment } from './../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() speed: number;
  @Input() minSpeed = 1;
  @Input() maxSpeed = 10;
  @Output() speedChangeEvent = new EventEmitter<number>();
  @Input() sampleSize: number;
  @Input() minSampleSize = 10;
  @Input() maxSampleSize = 250;
  @Output() sampleSizeChangeEvent = new EventEmitter<number>();
  env = environment;

  constructor() {}

  ngOnInit() {}
}
