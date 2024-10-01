import AsyncStorage from "@react-native-async-storage/async-storage"


type DatePremiumModal = {
    date : Date,
    active : boolean
}


export async function isShowModal(){
    let data = await AsyncStorage.getItem("DatePremiumModal")
    if(data != null){
       let dateModal : DatePremiumModal = JSON.parse(data) as DatePremiumModal;
       const now = new Date();
       if(dateModal.active == true && dateModal.date < now){
        savedModalDate(true);//Lors de l'achat du forfait mettre false
        return false; //Afficher le modal
       }
    }
    return true;
}

export async function  savedModalDate(active : boolean) {
    let date = new Date();
    date.setDate(date.getDate() + 15); 
    let datePremium : DatePremiumModal = {date : date, active: active};
    await AsyncStorage.setItem("DatePremiumModal",JSON.stringify(datePremium));
}

