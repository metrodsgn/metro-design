import { defineField, defineType } from "sanity";

export const beforeAfterType = defineType({
  name: "beforeAfter",
  title: "Antes e Depois",
  type: "document",
  groups: [
    { name: "info", title: "Informações", default: true },
    { name: "images", title: "Imagens" },
  ],
  fields: [
    defineField({
      name: "client",
      title: "Marca / cliente",
      type: "string",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segmento",
      type: "string",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Resumo do projeto",
      type: "text",
      rows: 3,
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "deliverable",
      title: "Entrega principal",
      type: "string",
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "before",
      title: "Imagem de antes",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "after",
      title: "Imagem de depois",
      type: "image",
      group: "images",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de exibição",
      type: "number",
      group: "info",
      description: "Menores números aparecem primeiro no carrossel.",
      initialValue: 0,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { title: "client", subtitle: "segment", media: "after" },
  },
});
