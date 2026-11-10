import { type SchemaTypeDefinition } from "sanity";
import { caseType } from "./case";
import { testimonialType } from "./testimonial";
import { metroHouseType } from "./metroHouse";
import { serviceFrontPhotosType } from "./serviceFrontPhotos";
import { aboutStoryPhotoType } from "./aboutStoryPhoto";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType, testimonialType, metroHouseType, serviceFrontPhotosType, aboutStoryPhotoType],
};
