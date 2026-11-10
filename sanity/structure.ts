import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Metro Design")
    .items([
      S.documentTypeListItem("case").title("Cases"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
      S.listItem()
        .title("metro hause")
        .child(S.document().schemaType("metroHouse").documentId("metroHouse")),
      S.listItem()
        .title("Fotos das frentes")
        .child(S.document().schemaType("serviceFrontPhotos").documentId("serviceFrontPhotos")),
      S.listItem()
        .title("Foto da página Sobre")
        .child(S.document().schemaType("aboutStoryPhoto").documentId("aboutStoryPhoto")),
    ]);
