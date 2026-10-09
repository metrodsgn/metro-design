import { defineField, defineType } from "sanity";

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Branding", value: "Branding" },
          { title: "Audiovisual", value: "Audiovisual" },
          { title: "Comunicação", value: "Comunicação" },
          { title: "Campanha", value: "Campanha" },
          { title: "Digital", value: "Digital" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      type: "image",
      options: { hotspot: true },
    
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "services",
      title: "Serviços",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Em destaque?",
      type: "boolean",
      initialValue: false,
      description: "Se marcado, o case aparece em destaque na home.",
    }),
  ],
});