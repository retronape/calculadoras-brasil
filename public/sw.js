const CACHE_VERSION = 'v1'
const CACHE_ESTATICO = `brasildcalcula-estatico-${CACHE_VERSION}`
const CACHE_PAGINAS = `brasildcalcula-paginas-${CACHE_VERSION}`

const URLS_ESTATICOS = [
  '/',
  '/styles/tokens.css',
  '/styles/temas.css',
  '/favicon.svg'
]

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_ESTATICO).then((cache) => cache.addAll(URLS_ESTATICOS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(
        chaves
          .filter((chave) => chave !== CACHE_ESTATICO && chave !== CACHE_PAGINAS)
          .map((chave) => caches.delete(chave))
      )
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (evento) => {
  const { request } = evento
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js') || url.pathname.endsWith('.svg') || url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg') || url.pathname.endsWith('.woff2')) {
    evento.respondWith(
      caches.open(CACHE_ESTATICO).then((cache) =>
        cache.match(request).then((resposta) => {
          if (resposta) return resposta
          return fetch(request).then((respostaRede) => {
            if (respostaRede.ok) cache.put(request, respostaRede.clone())
            return respostaRede
          })
        })
      )
    )
    return
  }

  evento.respondWith(
    caches.open(CACHE_PAGINAS).then((cache) =>
      fetch(request)
        .then((respostaRede) => {
          if (respostaRede.ok) cache.put(request, respostaRede.clone())
          return respostaRede
        })
        .catch(() => cache.match(request).then((resposta) => resposta || caches.match('/')))
    )
  )
})
