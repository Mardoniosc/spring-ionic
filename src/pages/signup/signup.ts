import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
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

  signupUser(){
    console.log('Enviando formulario')
  }

  updateCidades(){
    console.log('Update de cidades')
  }

}
