export interface Link<ID extends string> {
  id?: ID;
  origin: string;
  pathname: string;
  relativePathname: string;
  query: string;
  hash: string;
  next?: Link<ID>;
}
