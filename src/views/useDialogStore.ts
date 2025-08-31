import { reactive } from 'vue'

interface Dialog {
  isUserSpeak: boolean
}

const useDialogStore = () => {
  const dialog = reactive<Dialog>({
    isUserSpeak: false,
  })

  return dialog
}

export default useDialogStore
