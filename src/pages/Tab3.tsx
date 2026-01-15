import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img alt="Guillermo Zurita" src="https://hips.hearstapps.com/hmg-prod/images/henry-cavill-white-netflix-1644322628.jpg?crop=0.891xw:1.00xh;0.0553xw,0&amp;resize=768:*" />
          <IonCardHeader>
            <IonCardTitle>Guillermo Zurita</IonCardTitle>
            <IonCardSubtitle>guillermo.zurita@uisek.edu.ec</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Soy una persona que disfruta fusionar la ingeniería con la creatividad. Me muevo entre el diseño de hardware con ESP32 y KiCad, la ciberseguridad y la gestión de datos, buscando siempre entender cómo funcionan las cosas desde la raíz.

Pero no todo es código y circuitos; también me apasiona el lado estratégico de los negocios. Aplico el neuromarketing para potenciar proyectos comerciales y crear contenido que realmente conecte con las personas. En fin, soy un maker y estratega digital que nunca deja de aprender ni de construir.</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
