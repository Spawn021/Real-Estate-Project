import { useModalStore } from '@/store/useModalStore'

function Modal() {
  const { contentModal, setModal } = useModalStore()
  return (
    <div
      onClick={() => setModal(false, null)}
      className="fixed z-[1000] w-screen h-full flex items-center justify-center bg-overlay-40"
    >
      {contentModal}
    </div>
  )
}

export default Modal
