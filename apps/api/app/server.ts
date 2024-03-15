import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';

const app = createApp();

app.get('/', (c) => c.text('Hello HonoX!'));

showRoutes(app);

export default app;
