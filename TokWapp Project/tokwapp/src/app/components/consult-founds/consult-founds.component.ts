import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ConsulterService } from 'src/app/services/consulter/consulter.service';


@Component({
  selector: 'app-consult-founds',
  templateUrl: './consult-founds.component.html',
  styleUrls: ['./consult-founds.component.css']
})
export class ConsultFoundsComponent implements OnInit, OnChanges {
  founds: any
  @Output() foundsForAdd: EventEmitter<boolean>
  @Input() toUpdate: boolean
  constructor(private consulter: ConsulterService) { 
    this.founds = 'loading.......'
    this.foundsForAdd = new EventEmitter<boolean>()
    this.toUpdate = false
  }

  ngOnInit(): void {
    this.consulter.consultFounds().subscribe(
      data => {
        this.founds = data
      } 
    )
  }
  
  addFounds(){
    this.foundsForAdd.emit(true)
  }

  ngOnChanges(change: SimpleChanges){
    this.consulter.consultFounds().subscribe(
      data => {
        this.founds = data
      } 
    )
  }
}
