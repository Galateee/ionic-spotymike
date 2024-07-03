import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonLabel, IonListHeader, IonSegment, IonSegmentButton, } from "@ionic/angular/standalone";

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardContent, IonCardHeader, IonCard,  IonListHeader, IonLabel, IonButton, IonSegment, IonSegmentButton, CommonModule,
  ],
})
export class SegmentComponent  implements OnInit {


  @Input() hasHeader?: boolean;
  @Input() headerTitle?: string;
  @Input() hasGetAll?: boolean;
  selectedSegment: string = 'all';
  @Output() numberChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}


  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.numberChange.emit(event.detail.value)
    console.clear();
  }

}
