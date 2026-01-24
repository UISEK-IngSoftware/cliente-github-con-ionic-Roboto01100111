import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { logoGithub } from 'ionicons/icons';
import AuthService from '../services/AuthService';
import './Login.css';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!userName) {
      setError('Por favor ingresa tu usuario de GitHub');
      return;
    }
    if (!token) {
      setError('Por favor ingresa tu token de GitHub');
      return;
    }

    const success = AuthService.login(userName, token);

    if (success) {
      window.location.href = '/tab1';
    } else {
      setError('Error al iniciar sesión');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion">
        <div className="login-container">
          <IonIcon icon={logoGithub} className="login-logo" />
          <h1>Iniciar sesión con GitHub</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <IonInput
              labelPlacement="floating"
              fill="outline"
              type="text"
              required
              label="Usuario de Github"
              value={userName}
              onIonChange={(e) => setUserName(e.detail.value!)}
            />
            <IonInput
              className="login-field"
              label="Token de acceso personal"
              labelPlacement="floating"
              fill="outline"
              type="password"
              required
              value={token}
              onIonChange={(e) => setToken(e.detail.value!)}
            />
            {error && <div className="error-message">{error}</div>}
            <IonButton expand="block" type="submit" className="login-button">
              Iniciar sesión
            </IonButton>
          </form>
          <p className="login-hint">Ingresa tu usuario y Personal Access Token de GitHub</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
