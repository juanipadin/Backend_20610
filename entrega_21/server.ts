import { serve } from "https://deno.land/std@0.92.0/http/server.ts";

const server = serve({ port: 8000 });
const headers = new Headers();
headers.append("Content-Type", "text/html; charset=UTF-8");

for await (const req of server) {
  req.respond({
    status: 200,
    headers,
    body: `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bienvenido!</title>
        </head>
        <body>
          <h1 class="text-3xl m-2">Bienvenido al uso de Deno</h1>
          <button 
            class="border bg-indigo-600 text-white px-2 py-1 rounded m-2">
            Botón de Prueba
          </button>
        </body>
      </html>`,
  });
}