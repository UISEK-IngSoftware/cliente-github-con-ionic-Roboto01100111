import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonList } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { saveToken } from '../services/AuthService';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (!token) {
      alert('Por favor ingresa tu token de GitHub');
      return;
    }

    await saveToken(token);
    window.location.href = '/tab1';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ padding: '20px' }}>
          <IonList>
            <IonItem>
              <IonInput
                label="Token de GitHub"
                labelPlacement="floating"
                type="password"
                value={token}
                onIonChange={(e) => setToken(e.detail.value!)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              />
            </IonItem>
          </IonList>

          <IonButton expand="block" onClick={handleLogin} style={{ marginTop: '20px' }}>
            Iniciar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
