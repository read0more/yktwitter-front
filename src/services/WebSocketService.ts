import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

export default class WebSocketService {
  private socketIo: Socket<DefaultEventsMap, DefaultEventsMap>;

  constructor(url: string) {
    this.socketIo = io(url);
  }

  addEvent(eventName: string, listener: (...args: any[]) => void) {
    this.socketIo.on(eventName, listener);
  }

  close() {
    this.socketIo.close();
  }
}
