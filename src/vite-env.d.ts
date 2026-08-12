/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_DISCORD_PING_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
