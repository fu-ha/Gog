import { useRecoilState } from "recoil"
import { FlashMessageAtom } from "../atom/FlashMessageAtom"
import { FlashStateType, FlashValueType } from "types/FlashType"

export const useFlashMessage = (): { FlashMessage(value: FlashValueType): void } => {
  
  const [FlashAtom, setFlashAtom] = useRecoilState(FlashMessageAtom)
  
  const FlashMessage = (value: FlashValueType): void => {
    
    let State: FlashStateType = { show: false, state: "success", message: "message" }
    
    switch (value.type) {
      case "SUCCESS":
        State = { ...FlashAtom, show: true, state: "success", message: value.message }
        break;
      case "DANGER":
        State = { ...FlashAtom, show: true, state: "danger", message: value.message }
        break;
      case "HIDDEN":
        State = { ...FlashAtom, show: false };
        break;
      default:
        State = { ...FlashAtom }
    }
    setFlashAtom(State)
  }
  return { FlashMessage }
}