import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lekki.com',
  appName: 'lekki',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins:{
    SplashScreen:{
      launchAutoHide:false,
      showSpinner:true
    }
  }
};

export default config;
