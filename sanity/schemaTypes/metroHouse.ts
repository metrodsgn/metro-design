import { defineField, defineType } from "sanity";
import { GalleryBulkInput } from "./GalleryBulkInput";

export const metroHouseType = defineType({
  name: "metroHouse",
  title: "metro hause",
  type: "document",
  fields: [
    defineField({
      name: "photos",
      title: "Fotos da metro hause",
      type: "array",
      description: "Envie várias fotos e arraste para definir a ordem em que aparecem no site.",
      components: { input: GalleryBulkInput },
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "metro hause", subtitle: "Galeria da página Sobre" }),
  },
});
