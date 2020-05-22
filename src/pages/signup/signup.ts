import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  estados: EstadoDTO[]
  cidades: CidadeDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCTRL: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [
        'Mardonio',
        [Validators.required,Validators.minLength(5),Validators.maxLength(120)]
      ],
      email: [
        'mardonio.costa@live.com',
        [Validators.required,Validators.email,]
      ],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: [
        '30911870040',
        [Validators.required, Validators.minLength(11), Validators.maxLength(14)]
      ],
      senha: ['123123', [Validators.required]],
      logradouro: ['Copacabana', Validators.required],
      numero: ['22', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['72015035', [Validators.required]],
      telefone: ['6199545555', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]],
    })
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(
        data => {
          this.estados = data;
          this.formGroup.controls.estadoId.setValue(this.estados[0].id);
          this.updateCidades()
        },
        err => {}
      )
  }

  signupUser(){
    if(this.formGroup.invalid){
      return
    }
    this.clienteService.insert(this.formGroup.value)
      .subscribe(
        data => this.showInsertOK(),
        err => console.log(err)
      )
  }

  showInsertOK(){
    let alert = this.alertCTRL.create({
      title: 'Sucesso!',
      message: 'Cadatro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    })

    alert.present()
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
      .subscribe(
        data => {
          this.cidades = data;
          this.formGroup.controls.cidadeId.setValue(null)
        },
        err => console.log(err)
      )
  }

}
