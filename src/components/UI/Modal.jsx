import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from './Button'

const Modal = ({
  show,
  onClose,
  children,
  title,
  panelClassName,
  autoClose = true
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => (autoClose ? null : onClose?.())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center h-full min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full p-5 py-5 overflow-x-hidden text-left align-middle transition-all transform shadow-xl bg-primary rounded-2xl',
                  panelClassName
                )}
              >
                {title && (
                  <div className="flex items-center justify-between pb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6"
                    >
                      {title}
                    </Dialog.Title>
                    {onClose && (
                      <Button
                        variant="light"
                        onClick={() => onClose?.()}
                        className='md:!p-0 md:w-10 max-w-[40px] w-auto h-10' 
                      >
                        <MdOutlineClose size={22} />
                      </Button>
                    )}
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal