import { createApi } from "unsplash-js";

import { UNSPLASH_ACCESS_KEY } from '~/config';

/** @See https://unsplash.com/developers */
export const unsplashApi = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});
