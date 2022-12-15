import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider, cookieStorageManagerSSR, localStorageManager } from "@chakra-ui/react";
import {theme} from "./theme"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { MetaFunction,LoaderFunction } from "@remix-run/cloudflare";
import { ServerStyleContext, ClientStyleContext } from "./context";

// Typescript
// This will return cookies
export const loader: LoaderFunction = async ({ request }) => {
  // first time users will not have any cookies and you may not return
  // undefined here, hence ?? is necessary
  return request.headers.get("cookie") ?? "";
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Shorty",
  viewport: "width=device-width,initial-scale=1",
});

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  const cookies = useLoaderData();
  return (
    <Document>
      <ChakraProvider theme={theme} colorModeManager={typeof cookies == 'string' ? cookieStorageManagerSSR(cookies): localStorageManager}>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
