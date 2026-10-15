import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do cliente",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "company",
      title: "Empresa",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Cargo (opcional)",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Foto do cliente (opcional)",
      type: "image",
      description:
        "Foto quadrada para o avatar no carrossel. Se não houver foto, será exibida a inicial.",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Depoimento",
      type: "text",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "initial",
      title: "Inicial (para o avatar)",
      type: "string",
      validation: (rule) => rule.required().max(1),
    }),
    defineField({
      name: "time",
      title: "Tempo (ex: 'agora', '2 min', 'ontem')",
      type: "string",
      initialValue: "agora",
    }),
    defineField({
      name: "order",
      title: "Ordem (menor aparece primeiro)",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "company", media: "avatar" },
  },
});
