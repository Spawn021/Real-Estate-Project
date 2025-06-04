import { useModalStore } from '@/store/useModalStore'

function Modal() {
  const { contentModal, setModal } = useModalStore()
  return (
    <div
      onClick={() => setModal(false, null)}
      className="absolute z-[1000] top-0 left-0 w-screen h-screen bg-overlay-40 flex items-center justify-center"
    >
      {contentModal}
    </div>
  )
}

export default Modal
