import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Vistoria } from "./types";

const CHAVE = "@expoAulas:vistorias";

export async function carregar(): Promise<Vistoria[]> {
  const bruto = await AsyncStorage.getItem(CHAVE);
  if (bruto == null) return [];
  return JSON.parse(bruto) as Vistoria[];
}

export async function salvar(lista: Vistoria[]): Promise<void> {
  await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
}