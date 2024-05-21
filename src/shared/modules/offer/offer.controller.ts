import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { OfferService } from './offer-service.interface.js';
import { HttpMethod } from '../../libs/rest/types/http-method.enum.js';
import { fillDTO } from '../../helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { HttpError } from '../../libs/rest/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Get,
      handler: this.getById,
    });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Patch,
      handler: this.updateById,
    });
    this.addRoute({
      path: 'offers/:id',
      method: HttpMethod.Delete,
      handler: this.deleteById,
    });
    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremiumByCity,
    });
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavorites,
    });
    this.addRoute({
      path: '/favorites/:id',
      method: HttpMethod.Post,
      handler: this.addFavorite,
    });
    this.addRoute({
      path: '/favorites/:id',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const offer = await this.offerService.getById(id);

    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async updateById(): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'OfferController'
    );
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    await this.offerService.deleteById(id);
    this.noContent(res);
  }

  public async getPremiumByCity(req: Request, res: Response): Promise<void> {
    const city = req.query.city;
    if (city) {
      const offers = await this.offerService.getPremiumByCity(city as string);
      const responseData = fillDTO(OfferRdo, offers);
      this.ok(res, responseData);
    } else {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Bad request',
        'OfferController'
      );
    }
  }

  public async getFavorites(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getFavorites();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async addFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];

    const result = await this.offerService.addFavorite(id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }

  public async removeFavorite(req: Request, res: Response): Promise<void> {
    const id = req.params['id'];

    const result = await this.offerService.removeFavorite(id);
    const responseData = fillDTO(OfferRdo, result);
    this.ok(res, responseData);
  }
}
