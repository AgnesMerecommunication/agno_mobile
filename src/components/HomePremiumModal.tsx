import { useEffect, useState } from "react";
import { isShowModal } from "../utils/PremiumUtilis";
import PremiumModal from "./PremiumModal";


export default function HomePremiumModal(){
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
        const open = async()=>{
            let isShow = await isShowModal();
            setShowModal(isShow);
        }
        open();
    },[])

    return(
        <PremiumModal isVisible={showModal} onBackdropPress={()=> setShowModal(false)} close={()=> setShowModal(false)}/>
    )

}