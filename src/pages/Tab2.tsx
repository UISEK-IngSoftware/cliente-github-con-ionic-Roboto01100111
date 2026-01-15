import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonItem, IonList, IonTextarea, IonButton } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de nuevo repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de nuevo repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonList>
            <IonItem>
              <IonInput label="Nombre del repositorio" labelPlacement="floating" placeholder="" className="form-field"></IonInput>
            </IonItem>
            <IonItem>
              <IonTextarea label="Descripción del repositorio" rows={6} counter={true} maxlength={200} labelPlacement="floating" className="form-field"></IonTextarea>
            </IonItem>
            <IonButton fill="outline">Reset</IonButton>
            <IonButton>Guardar</IonButton>
          </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
