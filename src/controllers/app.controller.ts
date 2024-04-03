import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Would be shown without any mark.
   *
   * @param section Section code
   * @param input Content to store
   * @returns Newly archived article1
   *
   * @tag public Some description describing public group...
   * @summary Public API
   */
  @TypedRoute.Get('healthz')
  serverCheck(): string {
    return 'ok';
  }
}
