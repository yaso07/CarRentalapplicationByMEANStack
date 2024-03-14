import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NHaF5cWWJCf1JpRGRGfV5yd0VDalhWTnJcUj0eQnxTdEZiWX5WcXNQRmJZUkdzXA=='
);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
