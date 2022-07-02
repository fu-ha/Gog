import { atom } from "recoil"
import { FlashStateType } from "types/FlashType"

const initialFlashState: FlashStateType = { show: false, state: "success", message: "" }

export const FlashMessageAtom = atom<FlashStateType>({
  key: 'FlashMessageAtom',
  default: initialFlashState
})