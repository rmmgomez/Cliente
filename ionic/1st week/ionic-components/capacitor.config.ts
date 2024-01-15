import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "ionic-components",
  webDir: "www",
  server: {
    androidScheme: "https",
    //cleartext: true, // Si tu servidor web es http
  },
};

export default config;
