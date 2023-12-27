import { Component } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router , private auth : Auth) {
     onAuthStateChanged(auth,(user)=>{
      if(user){
        router.navigateByUrl('/tabs/tab1')
        SplashScreen.hide();
      }else{
        router.navigateByUrl('/welcome1')
        SplashScreen.hide();
      }
     })
   
  }
}

