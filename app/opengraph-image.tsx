import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#0e7c7b",
          color: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700 }}>Dr. Sheetal&apos;s</div>
        <div style={{ fontSize: 36, marginTop: 20 }}>Homoeopathy Clinic</div>
      </div>
    ),
    { ...size }
  );
}
