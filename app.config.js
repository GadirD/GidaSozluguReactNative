export default {
  expo: {
    name: "gida-sozlugu-rn",
    slug: "gida-sozlugu-rn",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.kadirt.gidasozlugurn"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "e7534618-23cf-48fb-a17a-68bdefa1c646"
      },
      API_BASE_URL: process.env.API_BASE_URL
    }
  }
};
