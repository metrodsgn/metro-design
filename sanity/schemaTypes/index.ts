import { type SchemaTypeDefinition } from "sanity";
import { caseType } from "./case";
import { testimonialType } from "./testimonial";
import { clientType } from "./client";
import { beforeAfterType } from "./beforeAfter";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType, testimonialType, clientType, beforeAfterType],
};
