import { useState } from 'react';
import { useIonViewDidEnter, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonButton, IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';
import { UserInfo } from '../interfaces/UserInfo';
import { getUserInfo } from '../services/GithubServices';
import AuthService from '../services/AuthService';
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
    if (response) {
      setUserInfo({
        login: response.login,
        name: response.name,
        avatar_url: response.avatar_url,
        bio: response.bio,
      });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login';
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

        <div className="profile-container">
          <div className="avatar-container">
            <img
              alt={userInfo.login}
              src={userInfo.avatar_url}
              className="avatar-img"
            />
          </div>

          <h1 className="profile-name">{userInfo.name}</h1>
          <p className="profile-username">{userInfo.login}</p>
          <p className="profile-bio">Estudiante de la UISEK</p>

          <IonButton color="danger" className="logout-button" onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
