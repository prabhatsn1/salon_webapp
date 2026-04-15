import content from "./content-mock.json";
import type { SiteContent } from "../types/content";

export const useContent = () => content as unknown as SiteContent;
