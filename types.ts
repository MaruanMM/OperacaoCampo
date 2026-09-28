export type StatusSync = "rascunho" | "na_fila" | "sincronizado" | "erro";

export type Vistoria = {
  idLocal: string;
  idRemoto?: string;
  equipamento: string;
  observacao?: string;
  fotoUri?: string;
  status: StatusSync;
  atualizadoEm: number;
};

export function textoDoStatus(status: StatusSync): string {
  switch (status) {
    case "rascunho": return "Rascunho - não enviado";
    case "na_fila": return "Salvo no aparelho";
    case "sincronizado": return "Enviado";
    case "erro": return "Falha ao enviar";
  }
}

export function haQuantoTempo(quando: number): string {
  const min = Math.floor((Date.now() - quando) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `há ${h} h`;
  return `há ${Math.floor(h / 24)} d`;
}