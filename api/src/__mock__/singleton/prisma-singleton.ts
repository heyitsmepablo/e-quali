/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { PrismaClient } from 'generated/prisma/client.js';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import PrismaSingleton from 'src/singleton/prisma-singleton';

jest.mock('src/singleton/prisma-singleton', () => {
  return {
    __esModule: true,
    default: {
      instance: { client: mockDeep<PrismaClient>() },
    },
  };
});

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = PrismaSingleton.instance
  .client as unknown as DeepMockProxy<PrismaClient>;
