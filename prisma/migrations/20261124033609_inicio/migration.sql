-- CreateTable
CREATE TABLE "Albergue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "ocupadas" INTEGER NOT NULL DEFAULT 0,
    "ultimaActualizacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprobado" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "correo" TEXT NOT NULL,
    "contrasenaHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "albergueId" TEXT,
    CONSTRAINT "Usuario_albergueId_fkey" FOREIGN KEY ("albergueId") REFERENCES "Albergue" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReporteDiario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "albergueId" TEXT NOT NULL,
    "personas" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReporteDiario_albergueId_fkey" FOREIGN KEY ("albergueId") REFERENCES "Albergue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");
