import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "co.economap.app",
  appName: "EconoMap",
  webDir: "www",
  server: {
    url: "https://econo-map.vercel.app",
    cleartext: false,
  },
};

export default config;
