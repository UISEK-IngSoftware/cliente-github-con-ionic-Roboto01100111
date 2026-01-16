import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonItem, IonList, IonTextarea, IonButton } from '@ionic/react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository } from '../services/GithubService';
import { useHistory } from 'react-router-dom';
import './Tab2.css';

const Tab2: React.FC = () => {

  const history = useHistory();
  const repoFormData : RepositoryItem = {
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  }

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  }

  const saveRepo = () => {
    console.log('Guardado repositorio: ', repoFormData);
    if (!repoFormData.name) {
      console.log('El nombre del repositorio es obligatorio');
      return;
    }

    createRepository(repoFormData).then(() => {
      history.push('/tab1');
    }).catch((error) => {
      console.log('Error al crear el repositorio: ', error);
      alert('Error al crear el repositorio');
    });
  }

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
              <IonInput label="Nombre del repositorio" labelPlacement="floating" placeholder="" className="form-field" value={repoFormData.name} onIonChange={(e) => setRepoName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonTextarea label="Descripción del repositorio" rows={6} counter={true} maxlength={200} labelPlacement="floating" className="form-field" value={repoFormData.description} onIonChange={(e) => setRepoDescription(e.detail.value!)}></IonTextarea>
            </IonItem>
            <IonButton onClick={saveRepo}>Guardar</IonButton>
          </IonList>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
