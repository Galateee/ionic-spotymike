import { Component, OnInit, Input } from '@angular/core';
import { IonListHeader, IonLabel, IonButton, IonSegment, IonSegmentButton, } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  standalone: true,
  imports: [ IonListHeader, IonLabel, IonButton, IonSegment, IonSegmentButton, CommonModule
  ],
})
export class SegmentComponent  implements OnInit {

  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;

  constructor() { }

  ngOnInit() {}

}
