import { DeleteBaseAlkemioInput } from '@domain/common/entity/base-entity';
import { UUID } from '@domain/common/scalars';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteVirtualContributorInput extends DeleteBaseAlkemioInput {
  @Field(() => UUID, { nullable: false })
  ID!: string;
}
