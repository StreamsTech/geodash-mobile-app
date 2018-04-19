import { MapService } from './../../services/MapService';
import { DocumentService } from './../../services/DocumentService';
import { LayersService } from './../../services/LayersService';
import { Component } from '@angular/core';
import { ApproveLayerPage } from "../approve-layer/approve-layer";
import { ApproveDocumentPage } from "../approve-document/approve-document";
import { ApproveMapPage } from "../approve-map/approve-map";

/**
 * Generated class for the ApprovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-approve',
  templateUrl: 'approve.html',
})
export class ApprovePage {

  newLyaers: any;
  newDocuments: any;
  newMaps: any;

  layerPage: any;
  documentPage: any;
  mapPage: any;
  constructor(public layerService: LayersService,
    public documentService: DocumentService,
    public mapService: MapService) {

    this.layerPage = ApproveLayerPage;
    this.documentPage = ApproveDocumentPage;
    this.mapPage = ApproveMapPage;
  }

  ngOnInit() {
    this.layerService.getLayers().then(() => {
    });

    this.documentService.getDocuments().then(() => {
    });

    this.mapService.getMaps().then(() => {
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovePage');
  }

}
