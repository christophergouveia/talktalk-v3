import { Moment } from "moment-timezone";

export interface dadosAvatares {
  apelido: string;
  cor: string;
}

export interface MessageType {
  message: string;
  messageTraduzido: string;
  senderId: string;
  date: Moment;
}
