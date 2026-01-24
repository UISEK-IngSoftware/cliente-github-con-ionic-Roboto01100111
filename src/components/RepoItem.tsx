import './RepoItem.css';
import { IonItemSliding, IonItem, IonThumbnail, IonLabel, IonItemOptions, IonItemOption, IonIcon } from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons';
import { RepositoryItem } from '../interfaces/RepositoryItem';

interface RepoItemProps {
  repo: RepositoryItem;
  onEdit?: (repo: RepositoryItem) => void;
  onDelete?: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        {repo.imageUrl && (
          <IonThumbnail slot="start">
            <img src={repo.imageUrl} alt={repo.name} />
          </IonThumbnail>
        )}
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p><strong>Propietario:</strong> {repo.owner}</p>
          <p><strong>Lenguaje:</strong> {repo.language}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={() => onEdit && onEdit(repo)}>
          <IonIcon slot="icon-only" icon={createOutline} />
        </IonItemOption>
        <IonItemOption color="danger" onClick={() => onDelete && onDelete(repo)}>
          <IonIcon slot="icon-only" icon={trashOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;
