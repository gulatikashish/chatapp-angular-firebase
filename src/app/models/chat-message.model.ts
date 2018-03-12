export class ChatMessage {
  $key: string
  email?: string
  displayName?: string
  message?: string
  timeSent?: Date = new Date()
}
