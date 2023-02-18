-- CreateTable
CREATE TABLE "keskustelu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "otsikko" TEXT NOT NULL,
    "sisalto" TEXT NOT NULL,
    "kirjoittaja" TEXT NOT NULL DEFAULT 'Anonyymi',
    "aikaleima" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
