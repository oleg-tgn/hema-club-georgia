import type { Access } from "payload";

export const isAdminOrModerator: Access = ({ req }) =>
  req.user?.role === "admin" || req.user?.role === "moderator";
