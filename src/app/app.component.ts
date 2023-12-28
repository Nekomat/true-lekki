import { Component ,OnInit} from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor(private router: Router , private auth : Auth , private service : DataService) {
     onAuthStateChanged(auth,(user)=>{ 
      if(user){ 
        router.navigateByUrl('/tabs/tab1')
        SplashScreen.hide(); 
      }else{  
        router.navigateByUrl('/welcome1')
        SplashScreen.hide();
      }
     })
     PushNotifications.requestPermissions().then((value)=>{
      if(value.receive=='granted'){
        PushNotifications.register()
      }
     })
  }
 async ngOnInit()  {
    Geolocation.getCurrentPosition({enableHighAccuracy:true}).then((value)=>{
      this.service.userLocation = value.coords
    })
  }


}

