var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // About page
  {
    path: '/about/',
    url: './pages/about.html',
    name: 'about',
  },

  // Components
  {
    path: '/cadastro',
    componentUrl: './pages/cadastro.html',
  },
  {
    path: '/mapa',
    componentUrl: './pages/mapa.html',
  },
  {
    path: '/listar',
    componentUrl: './pages/listar.html',
  },
  {
    path: '/informacoes/:id/:direcao',
    componentUrl: './pages/informacoes.html',
  },
  {
    path: '/aeronaves',
    componentUrl: './pages/aeronaves.html',
  },
  {
    path: '/contato/:id',
    componentUrl: './pages/contato.html',
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
