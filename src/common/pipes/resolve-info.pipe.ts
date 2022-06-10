import { Injectable, PipeTransform } from '@nestjs/common';
import { fieldsMap } from 'graphql-fields-list';

/** key, value pair: <field name, is primitive> */
export type SimpleFieldResolveType = Record<string, boolean>;

@Injectable()
export class ResolveInfoPipe implements PipeTransform {
  transform(value: any): Record<string, boolean> {
    const mapResult = fieldsMap(value);

    return Object.keys(mapResult).reduce<Record<string, boolean>>(
      (acc, key) => ({
        ...acc,
        [key]: typeof mapResult[key] !== 'object',
      }),
      {}
    );
  }
}
