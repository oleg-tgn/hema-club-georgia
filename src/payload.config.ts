import dns from "dns";
import path from "path";
import { fileURLToPath } from "url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Weapons } from "./collections/Weapons";
import { ScheduleGroups } from "./collections/ScheduleGroups";
import { Instructors } from "./collections/Instructors";
import { AboutSection } from "./globals/AboutSection";
import { WeaponsSection } from "./globals/WeaponsSection";
import { Address } from "./globals/Address";
import { seedUsers } from "./seed";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// Node's own DNS resolver sometimes picks an unreachable nameserver on this
// machine (e.g. a disconnected VPN/Hyper-V adapter), causing the SRV lookup
// for mongodb+srv:// to fail with ECONNREFUSED even though the OS resolver
// works fine. Force a known-good resolver for Node's queries.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Weapons, ScheduleGroups, Instructors],
  globals: [AboutSection, Address, WeaponsSection],
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  onInit: seedUsers,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  localization: {
    locales: ["en", "ka", "ru"],
    defaultLocale: "en",
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) =>
            `${process.env.R2_PUBLIC_URL}/${filename}`,
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        forcePathStyle: true,
      },
    }),
  ],
});
