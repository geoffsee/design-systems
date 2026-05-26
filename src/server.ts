import index from "./index.html";

const server = Bun.serve({
  development: process.env.NODE_ENV !== "production",
  port: Number(process.env.PORT ?? 3000),
  routes: {
    "/design-systems/:file": async (request) => {
      const url = new URL(request.url);
      const fileName = url.pathname.split("/").pop() ?? "";

      if (!fileName.endsWith(".html") || fileName.includes("..")) {
        return new Response("Not found", { status: 404 });
      }

      const file = Bun.file(`design-systems/${fileName}`);

      if (!(await file.exists())) {
        return new Response("Not found", { status: 404 });
      }

      return new Response(file, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    },
    "/": index,
    "/*": index,
  },
});

console.log(`Design system navigator running at ${server.url}`);
