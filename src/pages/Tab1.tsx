import React from 'react';
import { IonContent, IonHeader, IonPage, IonList, IonTitle, IonToolbar, IonLoading, useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import RepoItem from '../components/RepoItem';
import './Tab1.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { fetchRepositories, deleteRepository } from '../services/GithubServices';

const Tab1: React.FC = () => {
  const history = useHistory();
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
  };

  const handleEdit = (repo: RepositoryItem) => {
    history.push('/tab2', { repo });
  };

  const handleDelete = async (repo: RepositoryItem) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el repositorio ${repo.name}?`);
    if (confirmDelete) {
      const success = await deleteRepository(repo.owner!, repo.name);
      if (success) {
        setRepos(repos.filter(r => r.name !== repo.name));
      } else {
        // Si falla (404 = ya no existe), recargar lista para sincronizar
        loadRepos();
      }
    }
  };

  useIonViewWillEnter(() => {
    console.log('***** Cargando repositorios *****');
    loadRepos();
  });

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
        <IonLoading isOpen={loading} message="Cargando repositorios..." />
        <IonList>
          {repos.map((repo, index) => (
            <RepoItem key={index} repo={repo} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
