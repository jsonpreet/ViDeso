import clsx from "clsx"
import { useState } from "react"
import { FaRegTimesCircle } from "react-icons/fa"

const AlertBox = ({ children, variant = 'warning', wrapperClass, showButton = true }) => {
    const [showAlert, setShowAlert] = useState(true)
    const hideAlert = (e) => {
        e.preventDefault()
        setShowAlert(!showAlert)
    }
    return (
        <>
            {showAlert
                ?
                <div className={wrapperClass}>
                    <div
                        className={clsx('border inline-flex bg-opacity-20 justify-center mx-auto items-center rounded-lg p-4 alert-dismissible fade show', {
                            'border-yellow-400 bg-yellow-300 text-yellow-600': variant === 'warning',
                            'border-red-400 bg-red-300 text-red-600': variant === 'danger',
                            'border-green-400 bg-green-300 text-green-600': variant === 'success'
                        })}
                    >
                        {children}
                        {showButton
                            ?
                            <button
                                onClick={(e) => hideAlert(e)}
                                type="button"
                                className={clsx('ml-2 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75', {
                                    ' text-yellow-600': variant === 'warning',
                                    ' text-red-600': variant === 'danger',
                                    ' text-green-600': variant === 'success'
                                })}
                                data-bs-dismiss="alert"
                                aria-label="Close"
                            >
                                <FaRegTimesCircle size={20} />
                            </button>
                            : null
                        }
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default AlertBox