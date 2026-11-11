import type { Dictionary } from './en';

export const ptBR: Dictionary = {
  locale: 'pt-br',
  htmlLang: 'pt-BR',
  path: '/pt-br/',
  label: 'PT',
  skip: 'Ir para o conteúdo',
  meta: {
    title: 'Lurker Drops — Suas abas da Twitch assistindo sozinhas',
    description:
      'Extensão gratuita para navegador que mantém suas abas da Twitch assistindo a uma live compatível. Funciona no Chrome, Edge, Opera, Brave e outros navegadores Chromium.',
    ogLocale: 'pt_BR',
  },
  nav: {
    features: 'Recursos',
    how: 'Como funciona',
    faq: 'Dúvidas',
    install: 'Instalar',
    github: 'GitHub',
    language: 'Idioma',
    primary: 'Principal',
  },
  hero: {
    badge: 'Extensão gratuita para navegador',
    title: 'Suas abas da Twitch,',
    titleAccent: 'assistindo sozinhas.',
    subtitle:
      'Escolha uma categoria e as regras que você gosta. O Lurker Drops mantém a aba em uma live compatível, troca quando aparece uma melhor e fica quietinho no fundo.',
    primaryCta: 'Baixar a extensão',
    primaryNote: 'Grátis · Sem conta · Cerca de um minuto para configurar',
    secondaryCta: 'Ver como funciona',
    trust: ['Chrome, Edge, Opera, Brave e outros', 'Roda no seu computador', 'Código aberto', 'Sem cadastro'],
    imageAlt:
      'Popup do Lurker Drops com duas abas em lurker assistindo a uma live da Twitch, cada uma com sua predefinição e número de espectadores.',
  },
  features: {
    eyebrow: 'O que ele faz',
    title: 'Ajudante pequeno. Alívio grande.',
    subtitle:
      'É como pedir a um amigo para deixar a TV no canal certo. Só que esse amigo nunca se entedia.',
    items: [
      {
        title: 'Escolha o programa',
        text: 'Selecione uma categoria, como um jogo ou Just Chatting. Adicione uma palavra que o título precisa ter, ou palavras que você nunca quer ver.',
      },
      {
        title: 'Uma predefinição por aba',
        text: 'Lives tranquilas em uma aba, seu jogo favorito em outra. Cada aba guarda suas próprias regras, favoritos e lista de bloqueio.',
      },
      {
        title: 'Encontra uma live para você',
        text: 'A cada minuto ele olha de novo. Se uma live maior combina com suas regras, a aba vai para lá. Desligue Perseguir para ficar nos favoritos.',
      },
      {
        title: 'Assistindo em silêncio',
        text: 'Deixe a aba muda enquanto ela assiste. Seus alto-falantes ficam livres para chamadas, música ou o vídeo que você está vendo de verdade.',
      },
      {
        title: 'Resgate do chat',
        text: 'Se o chat da Twitch cair, a extensão reconecta. Se não funcionar, recarrega a página, no máximo uma vez a cada cinco minutos.',
      },
      {
        title: 'Baús de bônus',
        text: 'Quando um baú de bônus aparece na página, ela clica para você. Não precisa mais lembrar de olhar.',
      },
    ],
  },
  how: {
    eyebrow: 'Como funciona',
    title: 'Três passos. Depois esqueça.',
    subtitle: 'Você define as regras uma vez. A extensão faz a parte chata o dia inteiro.',
    steps: [
      {
        title: 'Diga o que assistir',
        text: 'Abra o popup, escolha uma categoria e adicione um filtro se quiser. Salve como predefinição para reusar depois.',
      },
      {
        title: 'Aperte Ligar',
        text: 'A aba abre uma live compatível com suas regras e fica nela. O ícone mostra quantos lurkers estão ativos.',
      },
      {
        title: 'Vá viver sua vida',
        text: 'Trabalhe, estude ou jogue. A cada minuto ele confere de novo e mantém a live certa tocando até você desligar.',
      },
    ],
    note: 'Você pode rodar várias abas ao mesmo tempo, cada uma com uma predefinição diferente.',
  },
  install: {
    eyebrow: 'Instalar',
    title: 'Adicione ao seu navegador em cerca de um minuto',
    subtitle:
      'A extensão ainda não está nas lojas de extensões. Instale pelo release oficial, em quatro passos simples.',
    steps: [
      {
        title: 'Baixe o ZIP',
        text: 'O botão acima sempre baixa o release mais novo do GitHub.',
      },
      {
        title: 'Descompacte a pasta',
        text: 'Você recebe uma pasta chamada lurker-drops. Dentro dela há um arquivo manifest.json.',
      },
      {
        title: 'Abra a página de extensões do navegador',
        text: 'No Chrome e no Brave use chrome://extensions, no Edge use edge://extensions e no Opera use opera://extensions. Ligue o Modo desenvolvedor, clique em Carregar sem compactação e escolha a pasta que você descompactou.',
      },
      {
        title: 'Fixe e aperte Ligar',
        text: 'Fixe o Lurker Drops na barra de ferramentas, abra o popup, adicione seu primeiro lurker e aperte Ligar.',
      },
    ],
    note: 'Funciona no Chrome, Edge, Opera e Brave para desktop. O Modo desenvolvedor é como navegadores Chromium instalam extensões que ainda não estão em uma loja.',
    cta: 'Baixar o release mais recente',
  },
  faq: {
    eyebrow: 'Dúvidas',
    title: 'Bom saber',
    items: [
      {
        q: 'É mesmo de graça?',
        a: 'Sim. O Lurker Drops é código aberto. Não tem conta, assinatura, anúncio nem nada para desbloquear.',
      },
      {
        q: 'Preciso deixar o navegador aberto?',
        a: 'Sim. A aba precisa ficar aberta para a Twitch contar o tempo assistido. Você pode deixá-la muda, mandar para o fundo ou mover para outra janela.',
      },
      {
        q: 'Ele vai ficar trocando de canal?',
        a: 'Só a aba que ele gerencia. Com Perseguir ligado, ele vai para uma live compatível com mais espectadores. Desligue para seguir seus favoritos na ordem que você definiu.',
      },
      {
        q: 'Ele coleta meus dados?',
        a: 'Sem analytics, sem rastreamento e sem servidor. Suas configurações ficam no armazenamento do navegador, no seu computador. Ele só pede à Twitch a lista pública de lives.',
      },
      {
        q: 'Ele garante drops ou recompensas?',
        a: 'Não. Ele mantém a aba assistindo a uma live compatível com suas regras, mas drops e recompensas seguem as regras da Twitch e das campanhas. Nunca use para quebrar essas regras.',
      },
      {
        q: 'Quais navegadores funcionam?',
        a: 'Chrome, Edge, Opera, Brave e outros navegadores baseados em Chromium no desktop. O Firefox não é suportado.',
      },
    ],
  },
  finalCta: {
    title: 'Deixe suas abas esperando por você.',
    subtitle: 'Baixe uma vez. Escolha o programa. Aperte Ligar. É só isso.',
    button: 'Quero o Lurker Drops',
    note: 'Grátis e de código aberto. Sem conta.',
  },
  footer: {
    tagline: 'Um ajudante pequeno e gratuito para quem assiste Twitch enquanto faz outra coisa.',
    github: 'Código-fonte',
    releases: 'Todos os releases',
    disclaimer:
      'Sem vínculo com a Twitch ou a Amazon. Twitch é uma marca da Twitch Interactive, Inc.',
    madeBy: 'Feito por Diogo',
  },
};
