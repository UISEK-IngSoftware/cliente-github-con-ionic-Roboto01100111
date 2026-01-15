import { IonContent, IonHeader, IonPage, IonList,   IonTitle, IonToolbar } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <RepoItem name="Android" imageUrl="https://icon.icepanel.io/Technology/png-shadow-512/Android-Studio.png" description="Description 1" />
          <RepoItem name="IOS" imageUrl="https://icon.icepanel.io/Technology/png-shadow-512/Apple.png" description="Description 2" />
          <RepoItem name="IONIC" imageUrl="https://icon.icepanel.io/Technology/svg/Ionic.svg" description="Description 3" />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
