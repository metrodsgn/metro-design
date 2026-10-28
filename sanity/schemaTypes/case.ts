import { defineField, defineType } from "sanity";
import { BrandColorInput } from "./BrandColorInput";
import { brandColors } from "./brandColors";
import { CASE_CATEGORIES } from "@/lib/constants";

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  groups: [
    { name: "info", title: "Informações", default: true },
    { name: "images", title: "Imagens" },
    { name: "content", title: "Conteúdo do case" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "info",
      description: "Nome do projeto exibido no site.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "info",
      description:
        "Endereço do projeto. Gere a partir do título e confira antes de publicar.",
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
      group: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      group: "info",
      options: {
        list: CASE_CATEGORIES.map((category) => ({
          title: category,
          value: category,
        })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brandColor",
      title: "Cor da marca",
      type: "string",
      group: "info",
      description:
        "Escolha uma amostra ou qualquer cor personalizada. Se ficar vazio, será usado o vermelho da Metro.",
      options: {
        layout: "dropdown",
        list: brandColors,
      },
      components: { input: BrandColorInput },
      validation: (rule) =>
        rule
          .regex(/^#[0-9a-fA-F]{6}$/)
          .error("Use uma cor hexadecimal como #1A73E8."),
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      group: "info",
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      type: "image",
      group: "images",
      description:
        "Imagem principal usada nas listagens e na abertura do projeto.",
      options: { hotspot: true },
      fields: [
        {
          name: "background",
          title: "Cor de fallback",
          type: "string",
          description:
            "Cor exibida enquanto a imagem carrega. Use hexadecimal, como #2F403D.",
          validation: (rule) =>
            rule
              .regex(/^#[0-9a-fA-F]{6}$/)
              .error("Use uma cor hexadecimal como #2F403D."),
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galeria",
      type: "array",
      group: "images",
      description:
        "Imagens do projeto; arraste para ordenar.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "background",
              title: "Cor de fallback",
              type: "string",
              description:
                "Cor exibida enquanto a imagem carrega. Use hexadecimal, como #2F403D.",
              validation: (rule) =>
                rule
                  .regex(/^#[0-9a-fA-F]{6}$/)
                  .error("Use uma cor hexadecimal como #2F403D."),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "paragraphs",
      title: "Parágrafos de introdução",
      type: "array",
      group: "content",
      description:
        "Até 3 parágrafos exibidos no topo da página do projeto. Se vazio, o site usa a descrição.",
      of: [{ type: "text", rows: 4 }],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "array",
      group: "content",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "services",
      title: "Serviços",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Em destaque?",
      type: "boolean",
      group: "info",
      initialValue: false,
      description:
        "Quando ativado, o projeto pode aparecer entre os até três projetos selecionados na home. Se nenhum case estiver marcado, a home exibe os três mais recentes.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "cover" },
  },
});
