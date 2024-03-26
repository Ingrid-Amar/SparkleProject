import { initializeApp } from 'firebase/app'

const myHeaders: Headers = new Headers();
myHeaders.append("apikey", "snt74ZjL3cf9ImnIkRkxx9JZ21BMvxgY");

const requestOptions: RequestInit = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/checkiday/event?id={id}", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


declare global {
  interface Window {
    myWidgetParam?: Array<{
      id: number;
      cityid: string;
      appid: string;
      units: string;
      containerid: string;
    }>;
  }
}

window.myWidgetParam = window.myWidgetParam || [];
window.myWidgetParam.push({
  id: 18,
  cityid: '2643743',
  appid: 'cdf48ec61d2ffc658379482db1be5558',
  units: 'imperial',
  containerid: 'openweathermap-widget-18',
});

(() => {
  const script = document.createElement('script');
  script.async = true;
  script.charset = "utf-8";
  script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
})();
