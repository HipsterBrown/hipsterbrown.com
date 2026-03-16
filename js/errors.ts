import * as Sentry from '@sentry/browser'

declare const __ELEVENTY_ENV__: string;
declare const __RELEASE__: string;

Sentry.init({
  dsn: "https://11242dfeb158486181983b78eff2d4cc@errors.togethehr.net/1",
  environment: __ELEVENTY_ENV__,
  release: __RELEASE__,
});
