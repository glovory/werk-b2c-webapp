import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { RemixRouteComponent } from "@pankod/refine-remix-router"; // , checkAuthentication

// import { authProvider } from "~/authProvider";

export const loader: LoaderFunction = async ({ request }) => {
  return json({});

  // await checkAuthentication(authProvider, request);
  // return null;
};

// export default RemixRouteComponent;

export default RemixRouteComponent.bind({ initialRoute: "/" });

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `RemixRouteComponent` like the following:
 *
 * export default RemixRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
