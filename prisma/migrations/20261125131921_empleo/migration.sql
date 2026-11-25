-- CreateTable
CREATE TABLE "OfertaEmpleo" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cupos" INTEGER NOT NULL,
    "grupoPrioritario" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OfertaEmpleo_pkey" PRIMARY KEY ("id")
);
