import { ImageResponse } from "next/og";

export const alt = "50-ամյակի հրավեր";
export const size = { width: 1200, height: 1200 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #16050b 0%, #030305 72%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "#030305",
            border: "10px solid #d6b15e",
            boxShadow: "0 0 90px rgba(245, 217, 139, 0.38)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 300,
              fontWeight: 700,
              lineHeight: 1,
              color: "#f5d98b",
              fontFamily: "Georgia, 'Times New Roman', serif",
              marginTop: -20,
            }}
          >
            A
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
