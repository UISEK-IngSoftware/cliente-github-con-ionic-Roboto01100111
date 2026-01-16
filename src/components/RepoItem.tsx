import './RepoItem.css';
import { IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import { RepositoryItem } from '../interfaces/RepositoryItem';

const RepoItem: React.FC<{ repo: RepositoryItem }> = ({ repo }) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img src={repo.imageUrl} alt={repo.name} />
      </IonThumbnail>
      <IonLabel>
        <h2>{repo.name}</h2>
        <p>{repo.description}</p>
        <p><strong>Propietario:</strong> {repo.owner}</p>
        <p><strong>Lenguaje:</strong> {repo.language}</p>
      </IonLabel>
    </IonItem>
  );
};

export default RepoItem;
