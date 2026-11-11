import type { Dictionary } from './en';

export const es: Dictionary = {
  locale: 'es',
  htmlLang: 'es',
  path: '/es/',
  label: 'ES',
  skip: 'Ir al contenido',
  meta: {
    title: 'Lurker Drops — Tus pestañas de Twitch viendo solas',
    description:
      'Extensión gratuita para navegador que mantiene tus pestañas de Twitch viendo un directo compatible. Funciona en Chrome, Edge, Opera, Brave y otros navegadores Chromium.',
    ogLocale: 'es_ES',
  },
  nav: {
    features: 'Funciones',
    how: 'Cómo funciona',
    faq: 'Preguntas',
    install: 'Instalar',
    github: 'GitHub',
    language: 'Idioma',
    primary: 'Principal',
  },
  hero: {
    badge: 'Extensión gratuita para navegador',
    title: 'Tus pestañas de Twitch,',
    titleAccent: 'viendo solas.',
    subtitle:
      'Elige una categoría y las reglas que te gusten. Lurker Drops mantiene esa pestaña en un directo compatible, cambia cuando aparece uno mejor y se queda callado en segundo plano.',
    primaryCta: 'Descargar la extensión',
    primaryNote: 'Gratis · Sin cuenta · Un minuto para configurar',
    secondaryCta: 'Ver cómo funciona',
    trust: ['Chrome, Edge, Opera, Brave y más', 'Se ejecuta en tu equipo', 'Código abierto', 'Sin registro'],
    imageAlt:
      'Popup de Lurker Drops con dos pestañas en lurker viendo un directo de Twitch, cada una con su ajuste y número de espectadores.',
  },
  features: {
    eyebrow: 'Qué hace',
    title: 'Ayudante pequeño. Alivio grande.',
    subtitle:
      'Es como pedirle a un amigo que deje la tele en el canal correcto. Solo que este amigo nunca se aburre.',
    items: [
      {
        title: 'Elige el programa',
        text: 'Elige una categoría, como un juego o Just Chatting. Añade una palabra que el título deba tener, o palabras que nunca quieras ver.',
      },
      {
        title: 'Un ajuste por pestaña',
        text: 'Directos tranquilos en una pestaña, tu juego favorito en otra. Cada pestaña guarda sus propias reglas, favoritos y lista de bloqueo.',
      },
      {
        title: 'Encuentra un directo por ti',
        text: 'Cada minuto vuelve a mirar. Si un directo más grande encaja con tus reglas, la pestaña se muda allí. Desactiva Perseguir para quedarte en tus favoritos.',
      },
      {
        title: 'Ver en silencio',
        text: 'Silencia la pestaña mientras mira. Tus altavoces quedan libres para llamadas, música o el vídeo que sí estás viendo.',
      },
      {
        title: 'Rescate del chat',
        text: 'Si el chat de Twitch se desconecta, la extensión lo reconecta. Si no funciona, recarga la página, como máximo una vez cada cinco minutos.',
      },
      {
        title: 'Cofres de bono',
        text: 'Cuando aparece un cofre de bono en la página, hace clic por ti. Ya no tienes que acordarte de mirar.',
      },
    ],
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos. Y luego olvídate.',
    subtitle: 'Configuras las reglas una vez. La extensión hace la parte aburrida todo el día.',
    steps: [
      {
        title: 'Dile qué mirar',
        text: 'Abre el popup, elige una categoría y añade un filtro si quieres. Guárdalo como ajuste para reutilizarlo.',
      },
      {
        title: 'Pulsa Activar',
        text: 'La pestaña abre un directo compatible con tus reglas y se queda ahí. El icono muestra cuántos lurkers están activos.',
      },
      {
        title: 'Vive tu vida',
        text: 'Trabaja, estudia o juega. Cada minuto comprueba de nuevo y mantiene el directo correcto hasta que lo apagues.',
      },
    ],
    note: 'Puedes tener varias pestañas a la vez, cada una con un ajuste diferente.',
  },
  install: {
    eyebrow: 'Instalar',
    title: 'Añádelo a tu navegador en un minuto',
    subtitle:
      'La extensión todavía no está en las tiendas de extensiones. Se instala desde la versión oficial, en cuatro pasos sencillos.',
    steps: [
      {
        title: 'Descarga el ZIP',
        text: 'El botón de arriba siempre descarga la versión más reciente de GitHub.',
      },
      {
        title: 'Descomprime la carpeta',
        text: 'Obtienes una carpeta llamada lurker-drops. Dentro hay un archivo manifest.json.',
      },
      {
        title: 'Abre la página de extensiones del navegador',
        text: 'En Chrome y Brave usa chrome://extensions, en Edge usa edge://extensions y en Opera usa opera://extensions. Activa el Modo de desarrollador, pulsa Cargar descomprimida y elige la carpeta que acabas de descomprimir.',
      },
      {
        title: 'Fija y pulsa Activar',
        text: 'Fija Lurker Drops en la barra, abre el popup, añade tu primer lurker y pulsa Activar.',
      },
    ],
    note: 'Funciona en Chrome, Edge, Opera y Brave de escritorio. El Modo de desarrollador es cómo los navegadores Chromium instalan extensiones que aún no están en una tienda.',
    cta: 'Descargar la última versión',
  },
  faq: {
    eyebrow: 'Preguntas',
    title: 'Bueno saberlo',
    items: [
      {
        q: '¿De verdad es gratis?',
        a: 'Sí. Lurker Drops es código abierto. No hay cuenta, suscripción, anuncios ni nada que desbloquear.',
      },
      {
        q: '¿Tengo que dejar el navegador abierto?',
        a: 'Sí. La pestaña debe seguir abierta para que Twitch cuente el tiempo visto. Puedes silenciarla, mandarla al fondo o moverla a otra ventana.',
      },
      {
        q: '¿Va a cambiar de canal todo el tiempo?',
        a: 'Solo la pestaña que gestiona. Con Perseguir activo, pasa a un directo compatible con más espectadores. Desactívalo para seguir tus favoritos en el orden que elijas.',
      },
      {
        q: '¿Recopila mis datos?',
        a: 'Sin analíticas, sin rastreo y sin servidor. Tus ajustes se guardan en el almacenamiento del navegador, en tu equipo. Solo pide a Twitch la lista pública de directos.',
      },
      {
        q: '¿Garantiza drops o recompensas?',
        a: 'No. Mantiene la pestaña viendo un directo compatible con tus reglas, pero los drops y las recompensas dependen de Twitch y de las campañas. Nunca lo uses para romper esas reglas.',
      },
      {
        q: '¿Qué navegadores funcionan?',
        a: 'Chrome, Edge, Opera, Brave y otros navegadores basados en Chromium de escritorio. Firefox no es compatible.',
      },
    ],
  },
  finalCta: {
    title: 'Deja que tus pestañas esperen por ti.',
    subtitle: 'Descarga una vez. Elige el programa. Pulsa Activar. Eso es todo.',
    button: 'Quiero Lurker Drops',
    note: 'Gratis y de código abierto. Sin cuenta.',
  },
  footer: {
    tagline: 'Un ayudante pequeño y gratuito para quien mira Twitch mientras hace otra cosa.',
    github: 'Código fuente',
    releases: 'Todas las versiones',
    disclaimer:
      'Sin relación con Twitch ni con Amazon. Twitch es una marca de Twitch Interactive, Inc.',
    madeBy: 'Hecho por Diogo',
  },
};
