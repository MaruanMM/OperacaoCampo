import { StyleSheet, Text, View, useColorScheme } from "react-native";
import type { Vistoria, StatusSync } from "./types";
import { textoDoStatus, haQuantoTempo } from "./types";
import { claro, escuro } from "./tema";

function Badge({ status }: { status: StatusSync }) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={[styles.badge, { backgroundColor: cores.estado[status] }]}>
      <Text style={styles.badgeTexto}>{textoDoStatus(status)}</Text>
    </View>
  );
}

type Props = { item: Vistoria };

export function ItemLista({ item }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={[styles.card, { backgroundColor: cores.superficie }]}>
      <View style={styles.info}>
        <Text style={[styles.titulo, { color: cores.texto }]} numberOfLines={1}>
          {item.equipamento}
        </Text>
        <Text style={[styles.detalhe, { color: cores.textoFraco }]} numberOfLines={1}>
          {haQuantoTempo(item.atualizadoEm)}
          {item.fotoUri ? " com foto" : ""}
        </Text>
      </View>
      <Badge status={item.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderRadius: 12 },
  info: { flex: 1 },
  titulo: { fontSize: 18, fontWeight: "600" },
  detalhe: { fontSize: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeTexto: { fontSize: 12, fontWeight: "600", color: "#FFFFFF" },
});