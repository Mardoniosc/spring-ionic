import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorangeService } from "../../services/storage.service";
import { ClienteService } from "../../services/domain/cliente.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { Camera, CameraOptions } from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  cliente: ClienteDTO;

  picture: string;

  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public storange: StorangeService,
    public clienteService: ClienteService
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storange.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        (data) => {
          this.cliente = data as ClienteDTO;
          this.getImageIfExists();
        },
        (err) => {
          if (err.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      (data) => {
        this.cliente.imageUrl = `${API_CONFIG.baseBucket}/cp${this.cliente.id}.jpg`;
      },
      (err) => console.log(err)
    );
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {}
    );
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      (err) => {}
    );
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(
        data => {
          this.picture = null;
          this.loadData();
        },
        err => {}
      )
  }

  cancel() {
    this.picture = null;
  }
}
