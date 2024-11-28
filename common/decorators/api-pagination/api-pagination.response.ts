import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDTO } from '../dto/paginated.dto';

interface PaginateDecoratorApiResponse {
  model: Type<any>;
  description?: string;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  options: PaginateDecoratorApiResponse,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedDTO),
    ApiOkResponse({
      description: options.description || 'Successfuly receivied model list',
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(PaginatedDTO),
          },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(options.model) },
              },
              meta: {
                type: 'any',
                default: {
                  totalItems: 2,
                  itemCount: 2,
                  itemsPerPage: 2,
                  totalPages: 1,
                  currentPage: 1,
                },
              },
            },
          },
        ],
      },
    }),
  );
};
