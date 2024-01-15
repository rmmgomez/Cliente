import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.fullstackpro.ionic.capacitor',
  appName: 'Ionic Capacitor',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true, // Si tu servidor web es http
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: '746820501392-oalflicqch2kuc12s8rclb5rf7b1fist.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  }
};

export default config;
