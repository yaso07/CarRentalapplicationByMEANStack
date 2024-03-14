import { Component, OnInit ,NgZone, AfterViewInit, ElementRef} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Zoom } from '@syncfusion/ej2-angular-maps';
import { DbService } from 'src/app/services/db.service';

declare var Microsoft: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,AfterViewInit {
  constructor(private ngZone: NgZone,private db:DbService,private form:FormBuilder) {}
  map: any;
  directionsManager: any;

  ngOnInit() {
    if (typeof Microsoft !== 'undefined') {
      this.loadBingMap();
    } else {
      setTimeout(() => {
        this.loadBingMap();
      }, 1000); // Wait for 1 second (adjust as needed)
    }
navigator.geolocation.getCurrentPosition(
        (position) => {
         console.log(position.coords.latitude);
          console.log( position.coords.longitude)
        })

  }
  buses:any
  ngAfterViewInit()
  {
       this.db.busDetails().subscribe((data)=>{
          console.log(data)
           this.buses=data
       })
  }

  loadBingMap() {
    this.ngZone.run(() => {
      this.map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'YOUR_BING_MAPS_API_KEY',
        center: new Microsoft.Maps.Location(0, 0),
        zoom: 20,
      });
         navigator.geolocation.getCurrentPosition((position) => {
           const userLocation = new Microsoft.Maps.Location(
             position.coords.latitude,
             position.coords.longitude
           );
           var pin = new Microsoft.Maps.Pushpin(userLocation);
           this.map.entities.push(pin);
           this.map.setView({ center: userLocation, zoom: 15 });
         });
        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', () => {
          this.directionsManager =
            new Microsoft.Maps.Directions.DirectionsManager(this.map);
          this.directionsManager.setRenderOptions({
            itineraryContainer: '#directionsContainer',
          });
        });

    });

}


  directions(location:any) {

      let routes;
      for(let bus of this.buses)
      {
        console.log(bus.routes)

        bus.routes.filter((element)=>{
              if(element==location.value)
              {
                routes=bus.routes;
              }
        })
        // for(let route of bus.routes)
        // {
        //       console.log(route==location.value);
        //     if(route==location.value)
        //     {
        //          console.log(route);
        //        routes=bus.routes;
        //     }
        // }

      }
      console.log(routes)
      console.log(location.value)

     routes.forEach(element => {
            this.directionsManager.addWaypoint(
              new Microsoft.Maps.Directions.Waypoint({ address: element })
            );


     });



     this.directionsManager.calculateDirections();


  }
}
