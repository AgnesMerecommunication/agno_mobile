import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { AndroidColor, AndroidImportance , TriggerType} from '@notifee/react-native';

export type Agenda = {
    id : string
    title : string,
    date : Date,
    from : Date,
    to : Date
}
type Notif = {
  agenda : {
    title: any;
    description: any;
    place: any;
    email: any;
  }
  time : Date
}
var data :  Agenda[]= [];

 export async function saveAgenda(agenda : Agenda){
    let agendas =     await AsyncStorage.getItem('agendas');
    if(agendas !== null){
        data = JSON.parse(agendas);
    }else {
        data = [];
    } 
    const time = new Date(agenda.from);
    data.push(agenda);
    await AsyncStorage.setItem('agendas', JSON.stringify(data));
    await lauchNotif({agenda : {title : agenda.title,description : "", place : "", email : ""}, time})
 }

 export async function saveAgendaAll(agendas : Agenda[]){ 
  data.push(...agendas);
  await AsyncStorage.setItem('agendas', JSON.stringify(data));
  for(var agenda of data){
    let time = new Date(agenda.from);
    await cancelScheduledNotification(agenda.title.replaceAll(' ', ""));
    await lauchNotif({agenda : {title : agenda.title,description : "", place : "", email : ""}, time})
  }
}




 export async function deleteAgenda(id : string){
    let agendas =     await AsyncStorage.getItem('agendas');
    if(agendas !== null){
        data = JSON.parse(agendas);
        let deleteAgenda = data.filter(item=>item.id === id);
        let resultat = data.filter(item=> item.id !== id);
        await AsyncStorage.setItem('agendas', JSON.stringify(resultat));
        if(deleteAgenda.length > 0){
          await cancelScheduledNotification(deleteAgenda[0].title.replaceAll(' ', ""));
        }
    }
 }

export async function updateAgenda(id: string, data : Agenda){
    let agendas =     await AsyncStorage.getItem('agendas');
    if(agendas !== null){
        var datas : Agenda[] = JSON.parse(agendas);
        let resultat = datas.findIndex(item=> item.id === id);
        datas[resultat] = data;
        await AsyncStorage.setItem('agendas', JSON.stringify(datas));
    }
    const time = new Date(data.from);
    await cancelScheduledNotification(data.title.replaceAll(' ', ""));
    await lauchNotif({agenda : {title : data.title, description : '', place : '',email : ''},time})
  }

 export async function getAgenda(id: string) {
    let agendas = await AsyncStorage.getItem('agendas');
    if(agendas !== null){
        data = JSON.parse(agendas);
        let resultats = data.filter(item=> item.id === id);
        return resultats[0];
    }else {
        return null;
    }
 }

 
 async function cancelScheduledNotification(id : string) {
  let isCreted = await notifee.isChannelCreated(id);
  if(isCreted == true){
    await notifee.cancelTriggerNotification(id);
   }
}
export async function notif(title : string,body : string, time : number,){
    // Request permissions (required for iOS)
    await notifee.requestPermission()
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: title.replaceAll(" ", ""),
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.RED,
    });
    // Display a notification
    var notification ={
      title: title,
      body: body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', 
        pressAction: {
          id: 'default',
        },
        sound : 'assets_mp3_alarm_01',
      },
      ios : {
       sound : 'default',
      }
    };
   //console.log(tima);
  await notifee.createTriggerNotification(notification,{
      type : TriggerType.TIMESTAMP,
      timestamp : time, alarmManager : {
        allowWhileIdle: true,
      }
    });

}

export async function lauchNotif(notificationProps : Notif){
  let now = Date.now();
  let time = notificationProps.time;
  time.setMinutes(time.getMinutes() - 10);
  if(now < time.getTime()){
    await notif(notificationProps.agenda.title, `L'evénement "${notificationProps.agenda.title}" arrivera dans  moins de 10  minutes.`, time.getTime());
    time.setMinutes(notificationProps.time.getMinutes() - 30);
    if(now < time.getTime()){
      await notif(notificationProps.agenda.title, `L'evénement "${notificationProps.agenda.title}" arrivera dans  moins de 30  minutes.`, time.getTime());
    }
  }      
}