export type FlashStateType = {
  show: boolean,
  variant: "success" | "danger", 
  message?: string
}

export type FlashValueType = {
  type: "SUCCESS" | "DANGER" | "HIDDEN",
  message?: string
}