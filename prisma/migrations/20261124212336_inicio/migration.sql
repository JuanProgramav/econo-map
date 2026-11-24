-- CreateTable
CREATE TABLE "Albergue" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "ocupadas" INTEGER NOT NULL DEFAULT 0,
    "ultimaActualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Albergue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasenaHash" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "albergueId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporteDiario" (
    "id" TEXT NOT NULL,
    "albergueId" TEXT NOT NULL,
    "personas" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReporteDiario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Afectacion" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "grupo" TEXT NOT NULL,
    "perdidaEstimada" INTEGER NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "estrategia" TEXT,
    "apoyoAsignado" INTEGER,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Afectacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_albergueId_fkey" FOREIGN KEY ("albergueId") REFERENCES "Albergue"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReporteDiario" ADD CONSTRAINT "ReporteDiario_albergueId_fkey" FOREIGN KEY ("albergueId") REFERENCES "Albergue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Afectacion" ADD CONSTRAINT "Afectacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
