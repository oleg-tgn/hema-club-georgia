import type { ComponentType } from "react";
import LongswordIcon from "./LongswordIcon";
import RapierIcon from "./RapierIcon";
import SaberIcon from "./SaberIcon";

export const weaponIcons: Record<string, ComponentType<{ className?: string }>> = {
  longsword: LongswordIcon,
  saber: SaberIcon,
  rapier: RapierIcon,
};
