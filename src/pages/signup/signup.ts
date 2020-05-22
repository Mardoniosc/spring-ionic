import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';


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
    public estadoService: EstadoService
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
        '15124585474',
        [Validators.required, Validators.minLength(11), Validators.maxLength(14)]
      ],
      senha: ['123123', [Validators.required]],
      logradouro: ['Copacabana', Validators.required],
      numero: ['22', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['72015035', [Validators.required]],
      telefone1: ['61999545555', [Validators.required]],
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
    console.log('Enviando formulario')
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
