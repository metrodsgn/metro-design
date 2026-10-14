import { defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "client",
  title: "Cliente",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do cliente",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description:
        "Envie a versão oficial da marca, de preferência em PNG transparente ou SVG.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Menores números aparecem primeiro na faixa.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
