import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnChanges {
  constructor(public filter:FilterService) {}

  value = '';
  ngOnChanges(change: SimpleChanges) {
    console.log(change);

  }

     brand = this.filter.brand;
     fuelType=this.filter.fuelType;
     transmission=this.filter.transmission;

    @Output('searchinput')
    searchValue:EventEmitter<string> =new EventEmitter();
    getValue()
    {
       this.searchValue.emit(this.value)
    }






}
