export const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  return (event.returnValue = true)
}
