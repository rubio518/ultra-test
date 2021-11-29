import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Publisher } from '../publisher/entities/publisher.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';
import { UpdateGameDto } from './dto/update-game.dto';

describe('GamesService', () => {
  type MockType<T> = {
    [P in keyof T]?: jest.Mock<any>;
  };
  let service: GamesService;
  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
    () => ({
      findOne: jest.fn((entity) => entity),
      save: jest.fn((entity) => entity),
      find: jest.fn((entity) => entity),
      softDelete: jest.fn((entity) => entity),
    }),
  );
  let repositoryMock: MockType<Repository<Game>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: 'GAMES_REPO',
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repositoryMock = module.get('GAMES_REPO');
  });
  describe('create', () => {
    it('should call games repository with a game object', async () => {
      const createDto: CreateGameDto = {
        price: 10.1,
        publisher: { id: 1 } as Publisher,
        releaseDate: new Date(),
        title: 'Dota',
        tags: [],
      };
      await service.create(createDto);
      expect(repositoryMock.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should call games repository find', async () => {
      await service.findAll();
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call games repository findOne', async () => {
      await service.findOne(123);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(123);
    });
  });

  describe('findPublisher', () => {
    it('should return a publisher', async () => {
      repositoryMock.findOne.mockReturnValueOnce({
        id: 123,
        publisher: { id: 543 } as Publisher,
      } as Game);
      const publisher = await service.findPublisher(123);
      expect(repositoryMock.findOne).toHaveBeenCalledWith(123);
      expect(publisher).toEqual({ id: 543 });
    });
  });

  describe('update', () => {
    it('should update the object sent to the repository', async () => {
      await service.update(123, { title: 'game to update' } as UpdateGameDto);
      expect(repositoryMock.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call the repo soft delete function', async () => {
      await service.remove(123);
      expect(repositoryMock.softDelete).toHaveBeenCalledWith(123);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
