import './RepoItem.css';
import { IonItem, IonThumbnail, IonLabel } from '@ionic/react';

interface RepoProps {
  name: string;
  imageUrl: string;
  description: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, imageUrl, description }) => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img src={imageUrl} alt={name} />
      </IonThumbnail>
      <IonLabel>
        <h2>{name}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default RepoItem;
