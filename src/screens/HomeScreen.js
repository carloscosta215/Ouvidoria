import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const VERDE = '#20B77A';

// Mapeia cada status para suas cores
const statusEstilo = {
  Recebida: {
    container: { backgroundColor: '#DCE8FF' },
    texto: { color: '#3867D6' },
  },
  'Em andamento': {
    container: { backgroundColor: '#F0E1FF' },
    texto: { color: '#7329C9' },
  },
  Concluída: {
    container: { backgroundColor: '#DDF8E8' },
    texto: { color: '#16834B' },
  },
};

// Mapeia cada tipo para a cor do texto
const tipoEstilo = {
  Reclamação: { color: '#FF3B30' },
  Sugestão: { color: '#315BFF' },
  Elogio: { color: '#00A651' },
};

export default function HomeScreen({ navigation, route }) {
  // Lista começa vazia
  const [manifestacoes, setManifestacoes] = useState([]);

  useEffect(() => {
    const nova = route?.params?.novaManifestacao;

    if (nova) {
      setManifestacoes((prev) => {
        // Evita duplicação em re-renders
        if (prev.some((m) => m.id === nova.id)) return prev;
        return [nova, ...prev];
      });

      // Limpa o parâmetro para não duplicar
      navigation.setParams({ novaManifestacao: undefined });
    }
  }, [route?.params?.novaManifestacao]);

  return (
    <View style={styles.homeContainer}>
      <StatusBar style="light" />

      <View style={styles.headerHome}>
        <Text style={styles.headerTitulo}>Página Inicial</Text>
        <Text style={styles.headerSubtitulo}>Aluno</Text>
      </View>

      <ScrollView
        style={styles.homeScroll}
        contentContainerStyle={styles.homeContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tituloLinha}>
          <Text style={styles.minhasManifestacoes}>
            Manifestações
          </Text>

          <TouchableOpacity
            style={styles.botaoNova}
            onPress={() => navigation.navigate('NovaManifestacao')}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoNovaTexto}>
              ＋ Nova Manifestação
            </Text>
          </TouchableOpacity>
        </View>

        {manifestacoes.length === 0 ? (
          <View style={styles.vazioContainer}>
            <Text style={styles.vazioTitulo}>
              Nenhuma manifestação ainda
            </Text>
            <Text style={styles.vazioTexto}>
              Toque em “＋ Nova Manifestação” para registrar
              sua primeira manifestação.
            </Text>
          </View>
        ) : (
          manifestacoes.map((item) => {
            const status =
              statusEstilo[item.status] || statusEstilo['Recebida'];
            const tipoCor =
              (tipoEstilo[item.tipo] || tipoEstilo['Reclamação']).color;

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopo}>
                  <Text style={styles.cardTitulo}>
                    {item.titulo}
                  </Text>

                  <View
                    style={[styles.statusBase, status.container]}
                  >
                    <Text
                      style={[styles.statusBaseTexto, status.texto]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDescricao}>
                  {item.descricao}
                </Text>

                <View style={styles.cardRodape}>
                  <Text
                    style={[styles.tipoTexto, { color: tipoCor }]}
                  >
                    {item.tipo}
                  </Text>
                  <Text style={styles.protocolo}>
                    {item.protocolo}
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerHome: {
    backgroundColor: VERDE,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 5,
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitulo: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  homeScroll: {
    flex: 1,
  },
  homeContent: {
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 30,
  },
  tituloLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    gap: 10,
  },
  minhasManifestacoes: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: '#111111',
  },
  botaoNova: {
    backgroundColor: VERDE,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
  },
  botaoNovaTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitulo: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111111',
    marginRight: 10,
  },
  cardDescricao: {
    color: '#60708A',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 15,
    marginBottom: 18,
  },
  cardRodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  protocolo: {
    color: '#60708A',
    fontSize: 12,
  },
  statusBase: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusBaseTexto: {
    fontSize: 12,
  },
  tipoTexto: {
    fontSize: 13,
  },
  // Estado vazio
  vazioContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  vazioIcone: {
    fontSize: 48,
    marginBottom: 12,
  },
  vazioTitulo: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111111',
    marginBottom: 8,
  },
  vazioTexto: {
    fontSize: 14,
    color: '#60708A',
    textAlign: 'center',
    lineHeight: 21,
  },
});
