const runtime = String.raw`
(() => {
  if (window.__andreiSiteRuntime) return
  window.__andreiSiteRuntime = true

  const updateHeader = () => {
    const header = document.querySelector('.preview-header')
    if (header) header.dataset.scrolled = String(window.scrollY > 24)
  }
  window.addEventListener('scroll', updateHeader, { passive: true })
  updateHeader()

  const language = (() => {
    try {
      return localStorage.getItem('lang') === 'ro' ? 'ro' : 'en'
    } catch {
      return 'en'
    }
  })()
  document.documentElement.lang = language === 'ro' ? 'ro' : 'en-GB'

  const enhancedCounts = new WeakSet()
  const enhance = (root) => {
    const labels = root.matches?.('[data-lang-en]')
      ? [root]
      : root.querySelectorAll?.('[data-lang-en]') || []
    for (const label of labels) {
      label.textContent = label.dataset[language === 'ro' ? 'langRo' : 'langEn'] || ''
    }

    const counts = root.matches?.('[data-countup]')
      ? [root]
      : root.querySelectorAll?.('[data-countup]') || []
    for (const count of counts) {
      if (enhancedCounts.has(count)) continue
      enhancedCounts.add(count)
      const value = Number(count.dataset.countup)
      if (!Number.isFinite(value) || matchMedia('(prefers-reduced-motion: reduce)').matches) continue
      if (!('IntersectionObserver' in window)) continue

      const observer = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting) return
        observer.disconnect()
        const duration = 1400
        let started = 0
        count.textContent = '0'
        const step = (now) => {
          if (!started) started = now
          const progress = Math.min((now - started) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          count.textContent = Math.round(eased * value).toLocaleString()
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }, { rootMargin: '0px 0px -10% 0px' })
      observer.observe(count)
    }
  }
  enhance(document)

  const mutations = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node instanceof Element) enhance(node)
      }
    }
  })
  mutations.observe(document.body, { childList: true, subtree: true })

  document.addEventListener('click', async (event) => {
    const button = event.target.closest?.('[data-copy-email]')
    if (!button) return
    const email = button.dataset.copyEmail
    const status = button.parentElement?.querySelector('[data-copy-status]')
    try {
      await navigator.clipboard.writeText(email)
      if (status) status.textContent = 'Copied'
      window.setTimeout(() => {
        if (status) status.textContent = 'Click to copy'
      }, 1600)
    } catch {
      window.location.href = 'mailto:' + email
    }
  })

  window.addEventListener('hashchange', () => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  })

  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments)
  }
  window.plausible.init = window.plausible.init || function(options) {
    window.plausible.o = options || {}
  }
  window.plausible.init()

  const loadAnalytics = () => {
    const script = document.createElement('script')
    script.src = '/js/p.js'
    script.dataset.api = '/api/p'
    script.defer = true
    document.head.appendChild(script)
  }
  const scheduleAnalytics = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAnalytics, { timeout: 4000 })
    } else {
      window.setTimeout(loadAnalytics, 1)
    }
  }
  if (document.readyState === 'complete') scheduleAnalytics()
  else window.addEventListener('load', scheduleAnalytics, { once: true })
})()
`

export function SiteRuntime() {
  return (
    <script dangerouslySetInnerHTML={{ __html: runtime }} />
  )
}
