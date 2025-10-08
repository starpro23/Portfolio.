/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_OWNER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
