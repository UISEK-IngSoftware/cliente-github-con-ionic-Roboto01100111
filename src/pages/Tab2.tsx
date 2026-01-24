import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonItem, IonList, IonTextarea, IonButton } from '@ionic/react';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createRepository, updateRepository } from '../services/GithubServices';
import { useHistory, useLocation } from 'react-router-dom';
import './Tab2.css';

interface LocationState {
  repo?: RepositoryItem;
}

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const isEditMode = location.state?.repo !== undefined;

  const [repoFormData, setRepoFormData] = useState<RepositoryItem>({
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language: null,
  });

  useEffect(() => {
    if (isEditMode && location.state?.repo) {
      setRepoFormData({
        name: location.state.repo.name,
        description: location.state.repo.description || '',
        imageUrl: location.state.repo.imageUrl,
        owner: location.state.repo.owner,
        language: location.state.repo.language,
      });
    } else {
      // Resetear formulario cuando no es modo edición
      setRepoFormData({
        name: '',
        description: '',
        imageUrl: null,
        owner: null,
        language: null,
      });
    }
  }, [isEditMode, location.state]);

  const setRepoName = (value: string) => {
    setRepoFormData({ ...repoFormData, name: value });
  }

  const setRepoDescription = (value: string) => {
    setRepoFormData({ ...repoFormData, description: value });
  }

  const saveRepo = () => {
    console.log('Guardado repositorio: ', repoFormData);
    if (!repoFormData.name) {
      console.log('El nombre del repositorio es obligatorio');
      return;
    }

    if (isEditMode) {
      updateRepository(repoFormData.owner!, repoFormData.name, repoFormData).then((result) => {
        if (result) {
          history.push('/tab1');
        } else {
          alert('Error al actualizar el repositorio');
        }
      });
    } else {
      createRepository(repoFormData).then(() => {
        history.push('/tab1');
      }).catch((error: any) => {
        console.log('Error al crear el repositorio: ', error);
        alert('Error al crear el repositorio');
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditMode ? 'Editar repositorio' : 'Formulario de nuevo repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditMode ? 'Editar repositorio' : 'Formulario de nuevo repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonList>
            <IonItem>
              <IonInput label="Nombre del repositorio" labelPlacement="floating" placeholder="" className="form-field" value={repoFormData.name} onIonChange={(e) => setRepoName(e.detail.value!)} disabled={isEditMode}></IonInput>
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
