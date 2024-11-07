export interface UserData {
  apelido: string;
  avatar: string;
  color: string;
  token: string;
  userToken: string;
}

export interface Language {
  label: string;
  value: string;
  flag: string;
  description?: string;
}

export interface MessageType {
  message: string;
  messageTraduzido: string;
  senderId: string;
  date: moment.Moment;
} 