import { AgentInfo } from '@core/authentication.agent.info/agent.info';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SocketIoSocket } from '../types/socket.io.socket';
import {
  SimpleMiddlewareHandler,
  WrappedMiddlewareHandler,
} from './middleware.handler.type';
import { KratosService } from '@services/infrastructure/kratos/kratos.service';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable()
export class ExcalidrawMiddlewareService {
  constructor(private readonly kratosService: KratosService) {}

  public checkSessionMiddleware: SimpleMiddlewareHandler = (
    socket: SocketIoSocket,
    next: (err?: Error) => void
  ) => {
    if (socket.disconnected) {
      return next();
    }

    const { session } = socket.data;
    const result = this.kratosService.checkSession(session);

    if (result) {
      return next(new UnauthorizedException(result));
    }

    next();
  };

  public attachSessionMiddleware: WrappedMiddlewareHandler =
    () => async (socket, next) => {
      try {
        socket.data.session = await this.kratosService.getSession(
          undefined,
          socket.handshake.headers.cookie
        );
      } catch (e: any) {
        next(
          new UnauthorizedException(`Unable to resolve session: ${e?.message}`)
        );
      }

      next();
    };

  public socketDataInitMiddleware: SimpleMiddlewareHandler = (
    socket: SocketIoSocket,
    next: (err?: Error) => void
  ) => {
    socket.data.agentInfo = new AgentInfo();
    socket.data.lastContributed = -1;
    socket.data.read = false;
    socket.data.update = false;
    socket.data.session = undefined;

    return next();
  };

  public attachAgentMiddleware: WrappedMiddlewareHandler =
    (authService: AuthenticationService) => async (socket, next) => {
      try {
        socket.data.agentInfo = await this.kratosService.getUserInfo(
          socket.handshake.headers,
          authService
        );
      } catch (e: any) {
        next(
          new UnauthorizedException(
            `Error when trying to authenticate with excalidraw server: ${e.message}`
          )
        );
      }

      next();
    };
}
