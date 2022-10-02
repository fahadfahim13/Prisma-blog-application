// playlist/src/main.ts

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const blogpost = await prisma.blogPosts.create({
    data: {
      name: 'Post 1',
      description: 'Post 1 Descriptions',
      body: 'Post 1 Body',
      categories: {
        create: {
          name: 'Category 1',
        }
      }
    },
  });
  console.log('Created new blog post: ', blogpost);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())