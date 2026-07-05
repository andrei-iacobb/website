// External endpoints are reachable from the open internet (Cloudflare tunnels).
export const EXTERNAL_SERVICES: { name: string; url: string }[] = [
  { name: "Forgejo", url: "https://git.iacob.co.uk/" },
  { name: "Vaultwarden", url: "https://vault.iacob.co.uk/" },
  { name: "Home Assistant", url: "https://hass.iacob.co.uk/" },
  { name: "Open WebUI", url: "https://openwebui.iacob.co.uk/" },
  { name: "Plex", url: "https://plex.iacob.co.uk/" },
]

export const EXTERNAL_SERVICE_NAMES = EXTERNAL_SERVICES.map((s) => s.name)
