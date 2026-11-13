import { site } from "./site";

/** Caminho da imagem social padrão (Open Graph) */
export const defaultOgImageSafe = "/og/pers-web-digital-og.jpg";

export function absoluteUrlFromSite(path = "/") {
  return new URL(path, site.url).toString();
}
