import { defineField, defineType } from "sanity";
import { BrandColorInput } from "./BrandColorInput";
import { GalleryBulkInput } from "./GalleryBulkInput";
import { brandColors } from "./brandColors";

export const caseType = defineType({
  name: "case",
  title: "Case",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Nome do projeto exibido no site.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "brandColor",
      title: "Cor da marca",
      type: "string",
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
      validation: (rule) => rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      type: "image",
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
      description: "Selecione várias imagens de uma vez ou arraste para ordenar.",
      components: { input: GalleryBulkInput },
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
      name: "description",
      title: "Descrição",
      type: "array",
      description: "Texto exibido abaixo do título na página do projeto.",
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
      description:
        "Quando ativado, o projeto pode aparecer entre os até três projetos selecionados na home. Se nenhum case estiver marcado, a home exibe os três mais recentes.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "cover" },
  },
});
