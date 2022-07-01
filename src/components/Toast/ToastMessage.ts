export type ToastType = 'info' | 'success' | 'warning' | 'error'

export class ToastMessage {
  id: string
  message: string
  type: ToastType

  constructor(message: string, type: ToastType) {
    this.id = generateUUID()
    this.message = message
    this.type = type
  }
}

function generateUUID() {
  const first = (Math.random() * 46656) | 0
  const second = (Math.random() * 46656) | 0
  const firstStr = ('000' + first.toString(36)).slice(-3)
  const secondStr = ('000' + second.toString(36)).slice(-3)

  return firstStr + secondStr
}
