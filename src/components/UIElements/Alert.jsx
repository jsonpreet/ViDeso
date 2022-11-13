import clsx from 'clsx'

const Alert = ({ children, variant = 'warning' }) => {
  return (
    <div
      className={clsx('border flex items-center rounded-xl p-4', {
        'border-yellow-500 border-opacity-50': variant === 'warning',
        'border-red-500 border-opacity-50': variant === 'danger',
        'border-green-500 border-opacity-50': variant === 'success'
      })}
    >
      {children}
    </div>
  )
}

export default Alert