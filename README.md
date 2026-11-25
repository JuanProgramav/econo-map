# EconoMap

Plataforma web y app Android para consultar y administrar **albergues** y la **recuperación económica** de las personas afectadas por un terremoto.

- Web: https://econo-map.vercel.app
- APK de prueba: https://github.com/JuanProgramav/econo-map/releases

> Proyecto académico de Ingeniería de Sistemas. Equipo: _(nombres)_. Materia: _(nombre de la materia)_.

## ¿Qué hace?

| Rol | Qué puede hacer |
|---|---|
| **Visitante** | Ver la lista de albergues, su ocupación y si sus datos están actualizados. No necesita cuenta. |
| **Responsable de albergue** | Reportar cada día cuántas personas hay. Solo puede editar **su** albergue. |
| **Ciudadano afectado** | Crear cuenta y reportar su pérdida (vivienda, empleo o local) indicando su grupo poblacional. Ve el estado de su caso. |
| **Administrador general** | Aprobar o rechazar albergues nuevos y afectaciones, y asignar una estrategia de apoyo. |

### Ciclo económico del proyecto

1. **Afectación:** el ciudadano registra su pérdida.
2. **Validación:** el administrador revisa el caso (evita reportes falsos).
3. **Estrategia:** se asigna Subsidio, Microcrédito o Capacitación y se calcula el apoyo.
4. **Evaluación y medición:** se compara la pérdida con lo cubierto.

Poblaciones consideradas: indígenas, afrodescendientes, LGBTIQ+, madres solteras, personas vulnerables y adultos mayores.

## Tecnologías

- **Next.js 16** (App Router) con **React** y **TypeScript**
- **Tailwind CSS** para el diseño (paleta en negros y grises)
- **Prisma 7** con **PostgreSQL** (Neon)
- **bcryptjs** (contraseñas cifradas) y **jose** (sesión con cookie firmada)
- **Vercel** para publicar la web
- **Capacitor** para empaquetar la app Android (APK)

## Arquitectura y código limpio

```
src/
├── app/            Pantallas (rutas de Next.js) y acciones del servidor
├── components/     Piezas visuales reutilizables
├── domain/
│   ├── entities/       Albergue, Usuario, ResponsableAlbergue, AdministradorGeneral, Ciudadano
│   ├── value-objects/  Capacidad, Correo, GrupoPoblacional, TipoAfectacion
│   └── strategies/     Estrategia, Subsidio, Microcredito, Capacitacion
├── repositories/   Interfaces y su implementación con Prisma
├── services/       Lógica de uso (autenticación, reportes, afectaciones)
└── lib/            Sesión, acceso, formato y utilidades
```

### Principios SOLID aplicados

- **S (responsabilidad única):** cada clase hace una sola cosa. `Albergue` guarda sus reglas, `AutenticacionServicio` solo valida el ingreso y `RepositorioAlberguesPrisma` solo habla con la base de datos.
- **O (abierto/cerrado):** para agregar una estrategia de apoyo nueva se crea una clase hija de `Estrategia` y se añade al catálogo, sin modificar el resto.
- **L (sustitución de Liskov):** `Subsidio`, `Microcredito` y `Capacitacion` se usan donde se espera una `Estrategia`. Igual con los roles frente a `Usuario`.
- **I (segregación de interfaces):** interfaces pequeñas, como `RepositorioSolicitudes` separada de `RepositorioAlbergues`.
- **D (inversión de dependencias):** los servicios dependen de interfaces (`RepositorioAlbergues`), no de Prisma. Por eso pasamos de SQLite a PostgreSQL cambiando solo la conexión.

### Code smells que evitamos

- **Switch-case largos:** los permisos viven en cada clase de usuario y las estrategias se buscan en un catálogo.
- **Obsesión con primitivos:** `Capacidad` y `Correo` son clases con sus validaciones.
- **Lista de parámetros larga:** los constructores reciben un objeto de datos.
- **Código duplicado:** estilos, formato de pesos, cifrado de contraseñas y validación de acceso viven en un solo lugar.
- **Números mágicos:** los porcentajes y umbrales son constantes con nombre.
- **Código muerto:** se eliminaron los archivos y dependencias sin uso.

## Cómo ejecutarlo en tu computador

Requisitos: Node.js 20 o superior y una base PostgreSQL (por ejemplo, un proyecto gratuito en Neon).

```bash
git clone https://github.com/JuanProgramav/econo-map.git
cd econo-map
npm install
```

Crea un archivo `.env` en la raíz con:

```
DATABASE_URL="tu-direccion-de-postgresql"
SESSION_SECRET="una-frase-larga-de-al-menos-32-caracteres"
```

Crea las tablas, genera el cliente y el primer administrador:

```bash
npx prisma7 migrate dev
npx prisma7 generate
npx tsx prisma/crearAdministrador.ts correo@ejemplo.com TuContrasenaSegura
npm run dev
```

Abre http://localhost:3000.

## App Android (APK)

La app es un contenedor de Capacitor que abre la web publicada, por eso **necesita internet**. Para instalarla, descarga `app-debug.apk` desde la sección [Releases](https://github.com/JuanProgramav/econo-map/releases) y ábrelo en el teléfono (hay que permitir la instalación de fuentes desconocidas).

## Estado del proyecto

- [x] Lista pública de albergues con ocupación
- [x] Login por roles y sesión segura
- [x] Registro de albergues con aprobación del administrador
- [x] Reporte diario de ocupación
- [x] Afectaciones económicas con estrategias de apoyo
- [x] Web publicada y APK
- [x] Panel de evaluación y medición
- [x] Banco de empleo y emprendimiento
