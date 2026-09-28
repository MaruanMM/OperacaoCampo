import { StyleSheet, Text, View, FlatList, Pressable, useColorScheme } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./App";
import { ItemLista } from "./ItemLista";
import type { Vistoria } from "./types";
import { textoDoStatus, haQuantoTempo } from "./types";
import { claro, escuro, toque } from "./tema";
import { carregar } from "./armazenamento";

function ListaVazia() {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  return (
    <View style={styles.vazio}>
      <Text style={[styles.vazioTitulo, { color: cores.texto }]}>Nenhuma vistoria registrada</Text>
      <Text style={[styles.vazioTexto, { color: cores.textoFraco }]}>
        Toque em "Nova vistoria" para começar. O registro fica salvo no aparelho mesmo sem sinal.
      </Text>
    </View>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, "Lista">;

export default function ListaScreen({ navigation }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  const [vistorias, setVistorias] = useState<Vistoria[]>([]);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let vivo = true;
      carregar().then((lista) => {
        if (vivo) { setVistorias(lista); setCarregando(false); }
      });
      return () => { vivo = false; };
    }, [])
  );

  return (
    <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.titulo, { color: cores.texto }]}>Operação Campo</Text>
      <Text style={[styles.variante, { color: cores.textoFraco }]}>Variante expoAulas</Text>
      
      {carregando ? (
        <Text style={{ color: cores.texto, marginTop: 20 }}>Carregando...</Text>
      ) : (
        <FlatList
          data={vistorias}
          keyExtractor={(r) => r.idLocal}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {}}
              hitSlop={8}
              style={{ minHeight: toque.minimo, justifyContent: "center" }}
              accessibilityRole="button"
              accessibilityLabel={`Vistoria ${item.equipamento}, ${textoDoStatus(item.status)}, atualizada ${haQuantoTempo(item.atualizadoEm)}`}
            >
              <ItemLista item={item} />
            </Pressable>
          )}
          contentContainerStyle={{ paddingVertical: 16, gap: 12 }}
          ListEmptyComponent={<ListaVazia />}
        />
      )}

      <Pressable
        onPress={() => navigation.navigate("NovaVistoria")}
        style={[styles.botao, { minHeight: toque.minimo, backgroundColor: cores.estado.sincronizado }]}
        accessibilityRole="button"
        accessibilityLabel="Nova vistoria"
      >
        <Text style={styles.botaoTexto}>+ Nova vistoria</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: "bold" },
  variante: { fontSize: 14, marginBottom: 16 },
  vazio: { alignItems: "center", paddingTop: 48, gap: 8 },
  vazioTitulo: { fontSize: 16, fontWeight: "600" },
  vazioTexto: { fontSize: 14, textAlign: "center" },
  botao: { padding: 16, borderRadius: 12, alignItems: "center", marginTop: 16, marginBottom: 16 },
  botaoTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }
});