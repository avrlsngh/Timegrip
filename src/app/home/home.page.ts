import { Component  } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private toastCtrl: ToastController) {}
    action_icon: string = 'play';
    percent: number = 0;
    radius: number = 100;
    progress: number = 0;
    minutes: number;
    seconds: any;
    count: number = 0;
    duration: any = '00:00:00';
    totalTime: number;
    timer: any;
    progress_timer: any;
    minuteCount: number = 0;
    secondCount_first: number = 0;
    secondCount_second: number = 0;
    flag: number = 0;
    temp_var :any;

    async presentToast() {
      const toast = await this.toastCtrl.create({
        message: 'Select the duration',
        duration: 1000,
        position: 'bottom',
        buttons: [
            {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }

    process_timer() {
      if (this.duration !== '00:00:00') {
        this.temp_var = this.duration;
        if (this.flag === 1) {
        this.secondCount_first = 0;
        this.secondCount_second = 0;
        this.minuteCount = 0;
        this.flag = 0;
        this.action_icon =  'play';
      }

        this.minutes = Number(this.duration.split(':')[1]);
        this.seconds = Number(this.duration.split(':')[2].split('.')[0]);
        this.totalTime = Number((this.minutes * 60) + this.seconds);
        this.count++;

        if (this.timer && this.count % 2 === 0 ) {
            clearInterval(this.timer);
            clearInterval(this.progress_timer);
            this.action_icon = 'play';
            return;
          }

        if (this.count % 2 !== 0) {
          this.action_icon = 'pause';
          this.timer = setInterval(() => {
          this.progress++;
          this.secondCount_second++;
          if (this.duration !== this.temp_var) {
                this.stop_timer();
              }
          if (this.secondCount_second > 9) {
              this.secondCount_first++;
              this.secondCount_second = 0;
            }
          if (Number(String(this.secondCount_first) + String(this.secondCount_second)) === 59) {
              this.minuteCount += 1;
              this.secondCount_first = 0;
              this.secondCount_second = 0;
            }
          if (this.progress === this.totalTime) {
              clearInterval(this.timer);
              clearInterval(this.progress_timer);
              this.progress = 0;
              this.count = 0;
              this.flag = 1;
              this.action_icon =  'play';
            }
          }, 1000);
      }
  } else {
    this.presentToast();
  }

}

    stop_timer() {
      clearInterval(this.timer);
      this.progress = 0;
      this.duration = '00:00:00';
      this.action_icon = 'play';
      this.secondCount_first = 0;
      this.secondCount_second = 0;
      this.minuteCount = 0;
    }

    doSomethingWithCurrentValue(e: any) {
      console.log(e);

    }

}
