// src/components/Loader/loaderStyles.js

export const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(7, 10, 25, 0.28)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
  backdropFilter: "blur(3px)",
};

export const innerStyle = {
  background: "#fff",
  padding: "18px 22px",
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(10,20,60,0.12)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#0f172a",
  fontWeight: 600,
  minWidth: 160,
};

export const spinnerStyle = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  border: "4px solid rgba(15,23,42,0.12)",
  borderTopColor: "#4f46e5",
  animation: "app-spin 0.9s linear infinite",
};

export const buttonSpinnerStyle = {
  display: "inline-block",
  width: 14,
  height: 14,
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.35)",
  borderTopColor: "rgba(255,255,255,1)",
  marginRight: 8,
  verticalAlign: "middle",
  animation: "app-spin 0.9s linear infinite",
};
