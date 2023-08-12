export const router = async (
  request: Request,
  response: (r: Response | PromiseLike<Response>) => Promise<void>
) => {
  const { method, url, body } = request;

  const { search, pathname } = new URL(url);
  const [path, pathComplement] = pathname.substring(1).split("/");
  const requestBody = body && (await request.json());

  console.log(path, pathComplement);

  const routes = {
    pessoas: () => {
      const resp = "Hello Pessoas";

      return response(
        new Response(resp, {
          status: 200,
        })
      );
    },
    "contagem-pessoas": () => {
      const resp = "10";

      return response(
        new Response(resp, {
          status: 200,
        })
      );
    },
  };

  const hasRoute = Object.keys(routes).find((route) => route === path);

  if (hasRoute) return routes?.[path as "pessoas" | "contagem-pessoas"]?.();
  return response(new Response(null, { status: 404 }));
};
