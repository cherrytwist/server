import { AgentInfo } from '@core/authentication.agent.info/agent.info';
import { AuthorizationPrivilege } from '@common/enums';
import { AuthorizationService } from '@core/authorization/authorization.service';
import { IAuthorizationPolicy } from '@domain/common/authorization-policy';
import { SocketIoSocket } from '../types/socket.io.socket';
import { CONNECTION_CLOSED } from '../types/event.names';

export const canUserRead = (
  authorizationService: AuthorizationService,
  agentInfo: AgentInfo,
  wbAuthorization?: IAuthorizationPolicy
): boolean => {
  try {
    authorizationService.grantAccessOrFail(
      agentInfo,
      wbAuthorization,
      AuthorizationPrivilege.READ,
      'access whiteboard'
    );
  } catch (e) {
    return false;
  }

  return true;
};

export const canUserUpdate = (
  authorizationService: AuthorizationService,
  agentInfo: AgentInfo,
  wbAuthorization?: IAuthorizationPolicy
): boolean => {
  try {
    authorizationService.grantAccessOrFail(
      agentInfo,
      wbAuthorization,
      AuthorizationPrivilege.UPDATE_CONTENT,
      'access whiteboard'
    );
  } catch (e) {
    return false;
  }

  return true;
};

// closes the connection for this socket
// and sends an optional message before disconnecting
export const closeConnection = (socket: SocketIoSocket, message?: string) => {
  if (message) {
    socket.emit(CONNECTION_CLOSED, message);
  }
  socket.removeAllListeners();
  socket.disconnect(true);
};
