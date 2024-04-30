//

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['https://www.example.shop', 'http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['Authorization'] // * 사용할 헤더 추가.
  }
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedClients: { [socketId: string]: boolean } = {};
  clientNickname: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  handleConnection(client: Socket): void {
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }

    this.connectedClients[client.id] = true;
  }

  handleDisconnect(client: Socket): void {
    delete this.connectedClients[client.id];

    // 클라이언트 연결이 종료되면 해당 클라이언트가 속한 모든 방에서 유저를 제거
    Object.keys(this.roomUsers).forEach(room => {
      const index = this.roomUsers[room]?.indexOf(this.clientNickname[client.id]);
      if (index !== -1) {
        this.roomUsers[room].splice(index, 1);
        this.server.to(room).emit('userLeft', { userId: this.clientNickname[client.id], room });
        this.server.to(room).emit('userList', { room, userList: this.roomUsers[room] });
      }
    });

    // 모든 방의 유저 목록을 업데이트하여 emit
    Object.keys(this.roomUsers).forEach(room => {
      this.server.to(room).emit('userList', { room, userList: this.roomUsers[room] });
    });

    // 연결된 클라이언트 목록을 업데이트하여 emit
    this.server.emit('userList', {
      room: null,
      userList: Object.keys(this.connectedClients)
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoin(client: Socket, room: string): void {
    // 이미 접속한 방인지 확인
    if (client.rooms.has(room)) {
      return;
    }

    client.join(room);
    this.server.to(room).emit('chatMessage', `User joined room ${room}`); // 해당 room에 메시지를 보냅니다.
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, data: { type: 'string' | 'image'; message: string; room: string; userId: number }): void {
    console.log(data);
    // 클라이언트가 보낸 채팅 메시지를 해당 방으로 전달
    this.server.to(data.room).emit('chatMessage', {
      userId: data.userId,
      message: data.message,
      room: data.room
    });
  }
}
