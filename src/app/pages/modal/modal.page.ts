import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() resultadoTotal: any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    this.modalController.dismiss();
  }

}
