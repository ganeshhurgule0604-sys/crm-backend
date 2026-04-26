import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service'; // 1. Import the service

describe('LeadController', () => {
  let controller: LeadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      // 2. Provide a mock version of the service
      providers: [
        {
          provide: LeadService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]), // Mock your methods here
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadController>(LeadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
