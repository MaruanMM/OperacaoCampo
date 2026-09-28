import { StyleSheet, Text, View, TextInput, Pressable, useColorScheme } from "react-native";
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./App";
import { claro, escuro, toque } from "./tema";
import { carregar, salvar } from "./armazenamento";
import type { Vistoria } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "NovaVistoria">;

export default function NovaVistoriaScreen({ navigation }: Props) {
  const cores = useColorScheme() === "dark" ? escuro : claro;
  
  const [equipamento, setEquipamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [salvando, setSalvando] = useState(false);

  const podeSalvar = equipamento.trim().length > 0 && !salvando;

  async function gravar() {
    setSalvando(true);
    const nova: Vistoria = {
      idLocal: String(Date.now()),
      equipamento: equipamento.trim(),
      observacao: observacao.trim() || undefined,
      status: "na_fila",
      atualizadoEm: Date.now()
    };
    const atuais = await carregar();
    await salvar([nova, ...atuais]);
    navigation.goBack();
  }

  return (
    <View style={[styles.tela, { backgroundColor: cores.fundo }]}>
      <Text style={[styles.label, { color: cores.texto }]}>Equipamento *</Text>
      <TextInput
        style={[styles.input, { backgroundColor: cores.superficie, color: cores.texto, borderColor: cores.textoFraco }]}
        value={equipamento}
        onChangeText={setEquipamento}
        placeholder="Ex: Bomba 03"
        placeholderTextColor={cores.textoFraco}
        accessibilityLabel="Nome do equipamento"
      />

      <Text style={[styles.label, { color: cores.texto, marginTop: 16 }]}>Observação</Text>
      <TextInput
        style={[styles.input, { backgroundColor: cores.superficie, color: cores.texto, borderColor: cores.textoFraco }]}
        value={observacao}
        onChangeText={setObservacao}
        placeholder="Opcional"
        placeholderTextColor={cores.textoFraco}
        accessibilityLabel="Observação"
      />

      <Pressable
        onPress={gravar}
        disabled={!podeSalvar}
        style={[
          styles.botao,
          { minHeight: toque.minimo, backgroundColor: podeSalvar ? cores.estado.sincronizado : cores.textoFraco }
        ]}
        accessibilityRole="button"
        accessibilityLabel="Salvar nova vistoria"
      >
        <Text style={styles.botaoTexto}>{salvando ? "Salvando..." : "Salvar"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  botao: { padding: 16, borderRadius: 12, alignItems: "center", marginTop: 32 },
  botaoTexto: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }
});