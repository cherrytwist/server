import { Module } from '@nestjs/common';
import { WhiteboardModule } from '@domain/common/whiteboard';
import { AuthenticationModule } from '@core/authentication/authentication.module';
import { AuthorizationModule } from '@core/authorization/authorization.module';
import { APP_ID_PROVIDER } from '@common/app.id.provider';
import { ContributionReporterModule } from '@services/external/elasticsearch/contribution-reporter';
import { EntityResolverModule } from '@services/infrastructure/entity-resolver/entity.resolver.module';
import { ExcalidrawRedisServerFactoryProvider } from './adapters/redis';
import { ExcalidrawServer } from './excalidraw.server';
import { ActivityAdapterModule } from '@services/adapters/activity-adapter/activity.adapter.module';
import { KratosModule } from '@services/infrastructure/kratos/kratos.module';
import { ExcalidrawMiddlewareService } from './middlewares/excalidraw.middleware.service';

@Module({
  imports: [
    AuthenticationModule,
    WhiteboardModule,
    AuthorizationModule,
    ContributionReporterModule,
    EntityResolverModule,
    ActivityAdapterModule,
    KratosModule,
  ],
  providers: [
    ExcalidrawRedisServerFactoryProvider,
    APP_ID_PROVIDER,
    ExcalidrawServer,
    ExcalidrawMiddlewareService,
  ],
  exports: [ExcalidrawMiddlewareService],
})
export class ExcalidrawServerModule {}
