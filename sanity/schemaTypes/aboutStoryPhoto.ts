import { defineField, defineType } from "sanity";

export const aboutStoryPhotoType = defineType({
  name: "aboutStoryPhoto",
  title: "Foto da página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Foto da página Sobre", subtitle: "Imagem da seção Somos" }),
  },
});
