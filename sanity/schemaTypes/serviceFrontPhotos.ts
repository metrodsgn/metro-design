import { defineField, defineType } from "sanity";

const frontImage = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Descrição da imagem",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
    ],
  });

export const serviceFrontPhotosType = defineType({
  name: "serviceFrontPhotos",
  title: "Fotos das frentes",
  type: "document",
  fields: [
    frontImage("brandingDesign", "Branding & Design"),
    frontImage("communicationContent", "Comunicação & Conteúdo"),
    frontImage("audiovisualCreativeDirection", "Audiovisual & Direção Criativa"),
    frontImage("digitalProductsTechnology", "Produtos Digitais & Tecnologia"),
  ],
  preview: {
    prepare: () => ({ title: "Fotos das frentes", subtitle: "Imagens da página Fazemos" }),
  },
});
