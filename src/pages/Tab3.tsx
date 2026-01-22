import { useState } from 'react';
import { useIonViewDidEnter, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubServices';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    login: '',
    name: 'No se puede cargar el nombre de usuario',
    avatar_url: '',
    bio: 'No se puede cargar la biografia',
  });
  const [loading, setLoading] = useState(false);

  const loadUserInfo = async () => {
    setLoading(true);
    const response = await getUserInfo();
    setUserInfo({
      login: response.login,
      name: response.name,
      avatar_url: response.avatar_url,
      bio: response.bio,
    });
    setLoading(false);
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

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
        <IonLoading isOpen={loading} message="Cargando perfil..." />
        <IonCard>
          <img alt={userInfo.login} src={userInfo.avatar_url} className="img" />
          <IonCardHeader>
            <IonCardTitle>{userInfo.name}</IonCardTitle>
            <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>{userInfo.bio}</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
