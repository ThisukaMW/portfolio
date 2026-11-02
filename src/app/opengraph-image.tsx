import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public/profile.jpg"))).toString("base64")}`;

// The preview card shown when the site link is shared on LinkedIn, WhatsApp, etc.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "72px",
          gap: "64px",
          color: "#ededf3",
          background:
            "radial-gradient(circle at 15% 20%, rgba(139,123,255,.35), transparent 45%), radial-gradient(circle at 90% 90%, rgba(62,224,207,.22), transparent 45%), #060609",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#c6f36b",
              marginBottom: 28,
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#c6f36b" }} />
            {profile.status}
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{profile.firstName}</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3, color: "#8d8da3" }}>
            {profile.lastName}
          </div>
          <div style={{ fontSize: 30, marginTop: 32, color: "#ededf3" }}>
            {`${profile.role} · ${profile.focus}`}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            {["CodeArena'26 Champion", "5× hackathon finalist", "Full-stack + AI"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  fontSize: 20,
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,.15)",
                  background: "rgba(255,255,255,.05)",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: 4,
            borderRadius: 40,
            background: "linear-gradient(135deg, #8b7bff, #3ee0cf, #c6f36b)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={340} height={420} style={{ borderRadius: 36, objectFit: "cover" }} alt="" />
        </div>
      </div>
    ),
    { ...size },
  );
}
