import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { WebSocketSupplier } from './services/webSocketSupplier/webSocketSupplier';
import { AppSettingsService } from './services/app-settings-service/app-settings-service';
import { TracksDataProvider } from './services/dataProvider/tracksDataProvider.service';
import { SimTracksDataProvider } from './services/dataProvider/sim-tracks-data-provider';
import { DraggableToMapService, MapLayerProviderOptions, MapsManagerService } from 'angular-cesium';
import { MatDialog, MatIconRegistry, MatSidenav } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DemoMapComponent } from './map/demo-map/demo-map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebSocketSupplier, AppSettingsService, TracksDataProvider, SimTracksDataProvider],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mainMap', {static: false}) mainMap: DemoMapComponent;
  arcGisMapServerProvider = MapLayerProviderOptions.ArcGisMapServer;
  flyToOptions = {
    duration: 2,
    destination: Cesium.Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
  };

  multiMap = false; // Change to true to enable multiple maps

  constructor(
    public appSettingsService: AppSettingsService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private mapsManagerService: MapsManagerService,
    private draggableToMapService: DraggableToMapService,
  ) {
    iconRegistry.addSvgIcon('settings', sanitizer.bypassSecurityTrustResourceUrl('/assets/settings.svg'));
    this.appSettingsService.showTracksLayer = true;
  }

  openSidenav(sidenav: MatSidenav) {
    this.dialog.closeAll();
    sidenav.open();
  }

  cleanMainMap() {
    this.mainMap.removeAll();
  }

  setMultiMaps() {
    this.multiMap = !this.multiMap;
  }

  ngAfterViewInit(): void {
    // example for getting the viewer by Id outside of the ac-map hierarchy
    const map = this.mapsManagerService.getMap('main-map');
    this.draggableToMapService.dragUpdates().subscribe(e => console.log(e));
  }
}
