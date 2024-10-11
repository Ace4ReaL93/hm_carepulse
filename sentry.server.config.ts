// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a893c74d09cb068793299bb69afc3ab6@o4508030574788608.ingest.de.sentry.io/4508030580359248",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
