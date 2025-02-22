import { IBaseAlkemio } from '@domain/common/entity/base-entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { IRoom } from '../room/room.interface';
import { UUID } from '@domain/common/scalars';
import { ExternalMetadata } from './vc.interaction.entity';

@ObjectType('VcInteraction')
export abstract class IVcInteraction extends IBaseAlkemio {
  @Field(() => IRoom)
  room!: IRoom;

  @Field(() => String)
  threadID!: string;

  @Field(() => UUID)
  virtualContributorID!: string;

  externalMetadata: ExternalMetadata = {};
}
