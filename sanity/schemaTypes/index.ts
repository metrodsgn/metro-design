import { type SchemaTypeDefinition } from "sanity";
import { caseType } from "./case";
import { testimonialType } from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType, testimonialType],
};