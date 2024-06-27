import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-products',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  propinaSeleccionada: any;
  numeroComensales: any;
  importeTotal: any;
  propinaManual: any;
  resultadoPorComensal: any;
  propina: number = 0;
  value: any;


  constructor(public modalController: ModalController, public alertController: AlertController) { }

  ngOnInit() {

  }

  pinFormatter(propinaManual: number) {
    return `${propinaManual}%`;
  }

  calcular() {


    if ((!this.importeTotal || Number(this.importeTotal) <= 0) || (!this.numeroComensales || Number(this.numeroComensales) <= 0)) {
      this.presentAlert();
    } else {
      if (this.propinaManual && Number(this.propinaManual) >= 0 && Number(this.propinaManual) <= 100) {
        //preferencia a la propina manual
        if (this.propinaSeleccionada) {
          this.propina = seleccionarPropinaMayor(this.propinaManual, this.propinaSeleccionada);
        } else {
          this.propina = this.propinaManual;
        }
      } else if (this.propinaSeleccionada) {
        this.propina = this.propinaSeleccionada;
      }
      console.log(this.propina)
      this.resultadoPorComensal = (Number(this.importeTotal) + (Number(this.importeTotal) * Number(this.propina)) / 100) / Number(this.numeroComensales);

      this.presentModal(Math.round(this.resultadoPorComensal * 100) / 100);
    }


  }

  resetValues() {
    this.propinaSeleccionada = undefined;
    this.numeroComensales = undefined;
    this.importeTotal = undefined;
    this.propinaManual = undefined;
  }

  async presentAlert() {
    //Alerta de validacion de campos
    const alert = await this.alertController.create({
      message: 'Campos vacíos o valores no válidos',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentModal(resultadoTotal: number) {
    //Modal para presentar el resultado a pagar por comensal
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'resultadoTotal': resultadoTotal
      }
    });
    return await modal.present();
  }

}
const seleccionarPropinaMayor = (propinaManual: any, propinaSeleccionada: any) => {
  //En caso de que el usuario introduzca dos tipos de propinas, nos quedamos con el valor mas alto
  if (propinaManual > propinaSeleccionada || Number(propinaManual) === Number(propinaSeleccionada)) {
    return propinaManual;
  } else if (propinaManual < propinaSeleccionada) {
    return propinaSeleccionada;

  }


}

