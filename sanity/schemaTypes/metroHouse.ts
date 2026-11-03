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
          fields: [
            defineField({
              name: "alt",
              title: "Descrição da foto",
              type: "string",
              description: "Descreva o que aparece na foto para leitores de tela.",
              validation: (Rule) => Rule.required().error("Informe uma descrição para a foto antes de publicar."),
            }),
            defineField({
              name: "caption",
              title: "Legenda",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Descrição complementar",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "metro hause", subtitle: "Galeria da página Sobre" }),
  },
});
