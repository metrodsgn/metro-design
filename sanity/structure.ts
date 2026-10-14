import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Metro Design")
    .items([
      S.documentTypeListItem("case").title("Cases"),
      S.documentTypeListItem("beforeAfter").title("Antes e Depois"),
      S.documentTypeListItem("client").title("Clientes"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
    ]);
