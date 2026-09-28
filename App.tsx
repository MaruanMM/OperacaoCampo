import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaScreen from "./ListaScreen";
import NovaVistoriaScreen from "./NovaVistoriaScreen";

export type RootStackParamList = {
  Lista: undefined;
  NovaVistoria: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Lista" 
          component={ListaScreen} 
          options={{ title: "Operação Campo" }} 
        />
        <Stack.Screen 
          name="NovaVistoria" 
          component={NovaVistoriaScreen} 
          options={{ title: "Nova vistoria" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}