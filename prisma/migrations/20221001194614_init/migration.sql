-- CreateTable
CREATE TABLE "BlogPosts" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "BlogPosts_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "_BlogPostsToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogPostsToCategory_AB_unique" ON "_BlogPostsToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogPostsToCategory_B_index" ON "_BlogPostsToCategory"("B");

-- AddForeignKey
ALTER TABLE "_BlogPostsToCategory" ADD CONSTRAINT "_BlogPostsToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "BlogPosts"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogPostsToCategory" ADD CONSTRAINT "_BlogPostsToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
