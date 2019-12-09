import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularCesiumModule, AngularCesiumWidgetsModule } from 'angular-cesium';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app.material.module';
import { DemoMapComponent } from './map/demo-map/demo-map.component';
import { TracksLayerComponent } from './map/tracks-layer/tracks-layer.component';
import { ContextMenuLayerComponent } from './map/context-menu-layer/context-menu-layer.component';
import { ToolbarExampleComponent } from './map/toolbar-example/toolbar-example.component';
import { KeyboardControlLayerComponent } from './map/keyboard-control-layer/keyboard-control-layer.component';
import { MyCustomContextMenuComponent } from './map/context-menu-layer/context-menu/my-custom-context-menu.component';
import { TracksDialogComponent } from './map/tracks-layer/track-dialog/track-dialog.component';
import { MainNavbarComponent } from './layout/main-navbar/main-navbar.component';
import { SettingsFormComponent } from './layout/settings-form/settings-form.component';
import { SidenavToolbarComponent } from './layout/sidenav-toolbar/sidenav-toolbar.component';
import { DemoMultipleMapsComponent } from './map/demo-multiple-maps/demo-multiple-maps.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent, DemoMapComponent, TracksLayerComponent, ContextMenuLayerComponent,
    ToolbarExampleComponent, KeyboardControlLayerComponent, DemoMultipleMapsComponent,
    MainNavbarComponent, SettingsFormComponent, SidenavToolbarComponent,
    TracksDialogComponent, MyCustomContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule,
  ],
  entryComponents: [TracksDialogComponent, MyCustomContextMenuComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: environment.server + '/graphql',
      }),
      cache: new InMemoryCache(),
    });
  }
}
