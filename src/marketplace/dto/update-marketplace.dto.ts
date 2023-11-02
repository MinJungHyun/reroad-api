import { PickType } from '@nestjs/mapped-types';
import { MarketplaceEntity } from '../entities/marketplace.entity';

export class UpdateMarketplaceDto extends PickType(MarketplaceEntity, []) {}
