import type { StatusSync } from "./types";

export const claro = {
  fundo: "#FFFFFF", 
  superficie: "#F2F4F7",
  texto: "#1A1A1A", 
  textoFraco: "#5A5A5A",
  estado: {
    rascunho: "#6B7280", 
    na_fila: "#B45309",
    sincronizado: "#166534", 
    erro: "#B91C1C",
  } as Record<StatusSync, string>
};

export const escuro = {
  fundo: "#0B0B0C", 
  superficie: "#1C1D20",
  texto: "#F5F5F5", 
  textoFraco: "#A8A8A8",
  estado: {
    rascunho: "#9CA3AF", 
    na_fila: "#F59E0B",
    sincronizado: "#4ADE80", 
    erro: "#F87171",
  } as Record<StatusSync, string>
};

export const espaco = { p: 8, m: 16, g: 24 };
export const toque = { minimo: 44 };