import { PassThrough } from "stream";
import type { EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToPipeableStream } from "react-dom/server";

// import Cookies from "js-cookie";
// import * as dotenv from 'dotenv';
// require('dotenv').config();

const ABORT_DELAY = 5000;

// dotenv.config();
// console.log('APPWRITE_URL: ', process.env.APPWRITE_URL);

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let didError = false;

    let { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady: () => {
          let body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");
          // Cookies.set(APPWRITE_URL, process.env.APPWRITE_URL); // NOT WORK

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = true;

          console.error(error);
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
