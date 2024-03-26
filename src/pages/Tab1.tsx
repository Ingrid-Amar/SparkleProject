import React, { useRef } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonButtons, IonButton
} from '@ionic/react';
import './Tab1.css';
function Cal() {
  const datetime = useRef<null | HTMLIonDatetimeElement>(null);
  const cancel = () => {
    datetime.current?.cancel();
  };
  const confirm = () => {
    datetime.current?.confirm();
    window.location.href = "Tab2"
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Month</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonDatetime ref={datetime}>
          <IonButtons slot="buttons">
            <IonButton color="primary" onClick={cancel}>
              Never mind
            </IonButton>
            <IonButton color="primary" onClick={confirm}>
              All Set
            </IonButton>
          </IonButtons>
        </IonDatetime>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Monthly</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Cal;