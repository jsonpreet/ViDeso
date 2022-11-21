import { log } from 'next-axiom'

const logger = {
  log: (message, info) => {
    //console.log(message, info)
    log.info(message, info)
  },
  warn: (...args) => {
    console.warn(...args)
  },
  error: (message, error) => {
    //console.error(message, error)
    log.error(message, error.message)
  }
}

export default logger