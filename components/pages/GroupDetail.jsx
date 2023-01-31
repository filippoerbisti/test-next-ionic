import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCardHeader, IonCardTitle,
    IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption,
    useIonToast,
    IonText
} from '@ionic/react';
import { chevronDownCircle, create, trash } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
  
const GroupDetail = ({ }) => {
    const [lists, setLists] = useState(Store.useState(selectors.getGroups))
    const contacts = Store.useState(selectors.getContacts)
    const [onEdit, setOnEdit] = useState(true);
    const params = useParams();
    const { id } = params;
    const loadedList = lists.find(l => l.id == id);
    const partecipants = []
    for (var i = 0; i < loadedList.partecipants.length; i++) {
      partecipants.push(contacts.filter(contact => contact.id == loadedList.partecipants[i]))
    }

    const [present] = useIonToast();

    const presentToast = (position) => {
      present({
        message: 'Gruppo salvato con successo!',
        duration: 1500,
        position: position
      });
    };

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const edit = () => {
      setOnEdit(...[false])
    }

    const save = () => {
      presentToast('top')
      setOnEdit(...[true])
    }

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/home" />
            </IonButtons>
            <IonTitle>{loadedList.name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {onEdit && <>
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
              <IonFabButton size="small">
                <IonIcon icon={chevronDownCircle}></IonIcon>
              </IonFabButton>
              <IonFabList side="bottom">
                <IonFabButton onClick={() => edit()}>
                  <IonIcon icon={create}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={() => alert('Cancella ' + loadedList.name)}>
                  <IonIcon icon={trash}></IonIcon>
                </IonFabButton>
              </IonFabList>
            </IonFab>
            </>
          }

          {onEdit && <>
              <IonCardHeader class='flex items-center'>
                <img alt="pic" src={loadedList.picture} className='w-14 h-14 rounded-full' />
                <div className='ml-4'>
                  <IonCardTitle>{capitalizeFirstLetter(loadedList.name)}</IonCardTitle>
                </div>
              </IonCardHeader>
              <IonItem className='flex items-start'>
                <IonText className='mt-2'>Partecipanti</IonText>
                <ul className='ml-6 mb-2'>
                  {partecipants.map((partecipant, index) => (
                    <IonItem key={index} routerLink={`/tabs/home/contact/${partecipant[0].id}`}>
                      - {capitalizeFirstLetter(partecipant[0].name)} {capitalizeFirstLetter(partecipant[0].surname)}
                    </IonItem>
                  ))}
                </ul>
              </IonItem>
            </>
          } 

          {!onEdit && <>
            <IonItem>
              <div className='m-2 flex items-center'>
                <img alt="pic" src={loadedList.picture} className='w-14 h-14 rounded-full' />
                <p className='ml-2' onClick={() => document.querySelector('#uploadPicture').click()}>Clicca per modificare la foto</p>
                <input id='uploadPicture' type="file" hidden  />
                {/* onChange={(e) => loadedList.picture = (e.target.files)} */}
              </div>
            </IonItem>
            <IonItem>
              <IonLabel className='pr-4'>Nome Gruppo</IonLabel>
              <IonInput clearInput={true} type="text" placeholder='Nome Gruppo' value={capitalizeFirstLetter(loadedList.name)} disabled={onEdit}></IonInput>
            </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
            </>
          }

          {!onEdit && <>
              <IonItem>
                <IonLabel>Collega Contatti</IonLabel>
                <IonSelect placeholder="Contatti" multiple={true} value={partecipants.map((p, i) => partecipants[i][0].id)}>
                  <IonSelectOption value="-1" disabled>Nessuno</IonSelectOption>
                  {contacts.map((contact, index) => (
                    <IonSelectOption key={index} value={contact.id}>{capitalizeFirstLetter(contact.name) + ' ' + capitalizeFirstLetter(contact.surname)}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </>
          }
          <IonItem counter={true}>
            <IonLabel position="floating">Note</IonLabel>
            <IonTextarea autoGrow={true} maxlength={200} value={loadedList.notes.slice(0, 200)} disabled={onEdit}></IonTextarea>
          </IonItem>
          {!onEdit && 
            <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
          }
        </IonContent>
      </IonPage>
    );
};
  
export default GroupDetail;
  