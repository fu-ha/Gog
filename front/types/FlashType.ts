export type FlashStateType = {
  show: boolean,
  state: "success" | "danger", 
  message?: string
}

export type FlashValueType = {
  type: "SUCCESS" | "DANGER" | "HIDDEN",
  message?: string
}