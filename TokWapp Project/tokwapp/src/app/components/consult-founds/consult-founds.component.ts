import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ConsulterService } from 'src/app/services/consulter/consulter.service';



@Component({
  selector: 'app-consult-founds',
  templateUrl: './consult-founds.component.html',
  styleUrls: ['./consult-founds.component.css']
})
export class ConsultFoundsComponent implements OnInit, OnChanges {
  founds: any
  @Output() foundsForAdd: EventEmitter<number>
  @Input() toUpdate: boolean
  @Input() walletNumber: number

  constructor(
    private consulter: ConsulterService,
  ) { 
    this.founds = 'loading.......'
    this.foundsForAdd = new EventEmitter<number>()
    this.toUpdate = false
    this.walletNumber = 0
  }

  ngOnInit(): void {
    this.requestParameter()
  }
  
  addFounds(){
    this.foundsForAdd.emit(this.walletNumber)
  }

  ngOnChanges(change: SimpleChanges){
    this.requestParameter()
  }

  requestParameter(){
    this.consulter.consultFounds(this.walletNumber).subscribe(
      data => {
        this.founds = data
      }
    )   
  }
}
