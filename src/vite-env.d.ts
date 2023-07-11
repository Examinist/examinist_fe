/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_IS_SERVER_UP: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
