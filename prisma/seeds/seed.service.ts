import { PrismaClient } from '@prisma/client';
import { InsertAllSeed } from './seed-master.data';

const prisma = new PrismaClient();

const _seeds = [new InsertAllSeed(prisma)];

async function main() {
  _seeds.forEach(async (clazz) => {
    await clazz.handleSeeds();
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
