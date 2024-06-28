import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'DEV à faire',
      subHeader: 'Maintenance / Indisponible pour le moment',
      buttons: ['Retour'],
    });

    await alert.present();
  }
}
