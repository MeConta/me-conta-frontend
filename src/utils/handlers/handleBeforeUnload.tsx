export const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.returnValue = true
  return true
}
