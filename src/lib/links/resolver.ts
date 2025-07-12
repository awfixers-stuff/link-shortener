export function resolve<ID extends string>(
  url: URL,
  shortenedLinks: Record<ID, string>,
): URL {
  const foundURL = findURL(url.pathname, shortenedLinks, url.origin);
  if (!foundURL) return url;

  const {
    pathname,
    query: initialQuery,
    hash: initialHash,
    destination: dest,
  } = foundURL;

  const hash = url.hash || initialHash || dest.hash;
  const query = combineQueries(dest.search, initialQuery, url.search);
  return new URL(`${dest.origin}${dest.pathname}${pathname}${query}${hash}`);
}

interface FoundURL {
  pathname: string;
  query: string;
  hash: string;
  destination: URL;
}

function findURL<ID extends string>(
  pathname: string,
  shortenedLinks: Record<ID, string>,
  destinationOrigin: string,
  maxRedirects = 256,
): FoundURL {
  let initialID: ID | undefined;
  let initialHash: string | undefined;
  let initialQuery: string | undefined;
  let relativePathname = "";

  while (maxRedirects-- > 0) {
    const hashIndex = pathname.lastIndexOf("#");
    if (hashIndex > -1) {
      if (initialHash === undefined) {
        initialHash = pathname.slice(hashIndex);
      }

      pathname = pathname.slice(0, hashIndex);
    }

    const queryIndex = pathname.lastIndexOf("?");
    if (queryIndex > -1) {
      if (initialQuery === undefined) {
        initialQuery = pathname.slice(queryIndex);
      }

      pathname = pathname.slice(0, queryIndex);
    }

    let id = pathname.slice(1) as ID;
    while (id.length > 0 && !shortenedLinks[id]) {
      const slashIndex = id.lastIndexOf("/");
      if (slashIndex === -1) break;

      id = id.slice(0, slashIndex) as ID;
    }

    if (!shortenedLinks[id]) {
      return {
        pathname: relativePathname,
        query: initialQuery || "",
        hash: initialHash || "",
        destination: new URL(pathname, destinationOrigin),
      };
    }

    if (shortenedLinks[id].startsWith("http")) {
      relativePathname = pathname.slice(id.length + 1) + relativePathname;

      return {
        pathname: relativePathname,
        query: initialQuery || "",
        hash: initialHash || "",
        destination: new URL(shortenedLinks[id]),
      };
    }

    if (shortenedLinks[id].startsWith("/")) {
      relativePathname = pathname.slice(id.length + 1) + relativePathname;
      pathname = shortenedLinks[id];

      if (!initialID) {
        initialID = id;
      }

      continue;
    }
  }

  throw new Error("Too many internal redirects");
}

function combineQueries(baseQuery: string, ...queries: string[]): string {
  const baseQueryParams = new URLSearchParams(baseQuery);
  const queryParams = queries.map((q) => new URLSearchParams(q));

  for (const params of queryParams) {
    for (const [key, value] of params) {
      baseQueryParams.set(key, value);
    }
  }

  const query = baseQueryParams.toString();
  return query.length > 0 ? `${query}` : "";
}
