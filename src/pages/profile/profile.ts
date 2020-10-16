import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorangeService } from "../../services/storage.service";
import { ClienteService } from "../../services/domain/cliente.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  cliente: ClienteDTO;

  picture: string;

  profileImagem;

  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public storange: StorangeService,
    public clienteService: ClienteService,
    public sanitizer: DomSanitizer
  ) {
    this.profileImagem = '../../assets/imgs/avatar-blank.png';
  }

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
        this.blobToDataUrl(data).then(
            dataUrl => {
              let str : string  = dataUrl as string
              this.profileImagem = this.sanitizer.bypassSecurityTrustUrl(str);
            }
          )
      },
      (err) => {
        this.profileImagem = '../../assets/imgs/avatar-blank.png';
      }
    );
  }

  blobToDataUrl(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
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
      (err) => {
        this.cameraOn = false;
      }
    );
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(
        data => {
          this.picture = null;
          this.loadData();
        },
        err => {
          this.cameraOn = false;
        }
      )
  }

  cancel() {
    this.picture = null;
  }
}
