import ConfirmationDialog from 'components/molecules/ConfirmationDialog'

export default function Home() {
  return (
    <ConfirmationDialog
      titleInfo={{ preText: 'Test' }}
      buttonText="Test"
      isClosable
      isModal
    ></ConfirmationDialog>
  )
}
