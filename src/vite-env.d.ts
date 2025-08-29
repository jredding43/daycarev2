/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRAPI_BASE_URL?: string;        // e.g. http://localhost:1337
  // If you came from CRA and migrated, you can mirror this name too:
  readonly REACT_APP_STRAPI_BASE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}