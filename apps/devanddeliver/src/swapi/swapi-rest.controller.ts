import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwapiResources } from '@dad/shared';
import { SwapiService } from './swapi.service';
import { GetAllInputDto } from './dto';

/**
 * This normally should be done by dividing each separate resource to each independent controller (FilmsController, PeopleController ...),
 * but since this is a very uniform api we can do it in more dynamic way.
 */
@ApiTags('SWAPI Rest')
@Controller('rest')
export class SwapiRestController {
  constructor(private swapiService: SwapiService) {}

  @ApiParam({
    name: 'resource',
    enum: SwapiResources,
    description: 'Endpoint resource to fetch',
  })
  @ApiOkResponse({
    description: `List of elements for given resource`,
  })
  @ApiQuery({
    type: GetAllInputDto,
    description: `Query options for returning object`,
  })
  @Get(':resource')
  getResources(@Param('resource') resource: SwapiResources, @Query() data: GetAllInputDto) {
    return this.swapiService.getAll(resource, data);
  }

  @ApiParam({
    name: 'resource',
    enum: SwapiResources,
    description: 'Endpoint resource to fetch',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Endpoint resource to fetch',
  })
  @ApiOkResponse({
    description: `List of elements for given resource`,
  })
  @Get(':resource/:id')
  getSingleResource(@Param('resource') resource: SwapiResources, @Param('id', new ParseIntPipe()) id: number) {
    return this.swapiService.getOne(resource, id);
  }
}
