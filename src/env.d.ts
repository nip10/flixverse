interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  /**
   * Built-in environment variable.
   * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
   */
  readonly NG_APP_ENV: string;
  // Add your environment variables below
  readonly NG_APP_TMDB_API_READ_ACCESS_TOKEN: string;
  [key: string]: any;
}