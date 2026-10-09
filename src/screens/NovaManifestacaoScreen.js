import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const VERDE = '#20B77A';

const tipos = [
  { label: 'Reclamação', icon: '⚠️' },
  { label: 'Sugestão', icon: '💡' },
  { label: 'Elogio', icon: '❤️' },
  { label: 'Denúncia', icon: '🛡️' },
];

export default function NovaManifestacaoScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Reclamação');
  const [descricao, setDescricao] = useState('');
  const [anonima, setAnonima] = useState(false);

  function enviarManifestacao() {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o título e a descrição da manifestação.'
      );
      return;
    }

    Alert.alert(
      'Manifestação registrada!',
      'Sua manifestação foi validada na tela de demonstração.',
      [
        {
          text: 'OK',
          onPress: () => navigation?.goBack(),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.voltar}
          accessibilityLabel="Voltar"
        >
          <Text style={styles.voltarTexto}>‹</Text>
        </TouchableOpacity>

        <View style={styles.headerTexto}>
          <Text style={styles.headerTitulo}>
            Nova Manifestação
          </Text>
          <Text style={styles.headerSubtitulo}>
            Sua voz ajuda a melhorar nossa escola.
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.introducao}>
          <Text style={styles.tituloSecao}>Conte para nós</Text>
          <Text style={styles.textoAuxiliar}>
            Preencha os campos abaixo para registrar sua manifestação.
          </Text>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Título da manifestação *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Problemas na biblioteca"
            placeholderTextColor="#97A19A"
            value={titulo}
            onChangeText={setTitulo}
            maxLength={100}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Tipo de manifestação *</Text>

          <View style={styles.tiposContainer}>
            {tipos.map((item) => {
              const selecionado = tipo === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.tipoCard,
                    selecionado && styles.tipoSelecionado,
                  ]}
                  onPress={() => setTipo(item.label)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: selecionado }}
                >
                  <Text style={styles.tipoIcone}>{item.icon}</Text>
                  <Text
                    style={[
                      styles.tipoTexto,
                      selecionado && styles.tipoTextoSelecionado,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva sua manifestação com o máximo de detalhes possível..."
            placeholderTextColor="#97A19A"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
            maxLength={2000}
          />
          <Text style={styles.contador}>
            {descricao.length}/2000 caracteres
          </Text>
        </View>

        <View style={styles.anexos}>
          <Text style={styles.label}>📎 Anexos (opcional)</Text>
          <Text style={styles.textoAuxiliar}>
            Adicione imagens ou documentos para complementar seu relato.
          </Text>

          <TouchableOpacity
            style={styles.botaoAnexo}
            onPress={() =>
              Alert.alert(
                'Anexos',
                'Integre um seletor de arquivos para habilitar esta função.'
              )
            }
          >
            <Text style={styles.botaoAnexoTexto}>
              ＋ Adicionar arquivo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.anonimoCard}>
          <View style={styles.anonimoTextoContainer}>
            <Text style={styles.label}>Enviar anonimamente</Text>
            <Text style={styles.textoAuxiliar}>
              Sua identidade não será informada no registro.
            </Text>
          </View>

          <Switch
            value={anonima}
            onValueChange={setAnonima}
            trackColor={{ false: '#DCE5DE', true: VERDE }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity
          style={styles.botaoEnviar}
          onPress={enviarManifestacao}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoEnviarTexto}>
            Enviar manifestação →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </TouchableOpacity>

        <Text style={styles.rodape}>* Campos obrigatórios</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F5',
  },
  header: {
    backgroundColor: VERDE,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  voltar: {
    width: 36,
    height: 42,
    justifyContent: 'center',
    marginRight: 10,
  },
  voltarTexto: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 42,
  },
  headerTexto: {
    flex: 1,
  },
  headerTitulo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerSubtitulo: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 5,
  },
  scroll: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 35,
  },
  introducao: {
    marginBottom: 24,
  },
  tituloSecao: {
    color: '#17211D',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  textoAuxiliar: {
    color: '#66736C',
    fontSize: 13,
    lineHeight: 20,
  },
  campo: {
    marginBottom: 22,
  },
  label: {
    color: '#202923',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    color: '#202923',
  },
  tiposContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tipoCard: {
    width: '48%',
    flexGrow: 1,
    minHeight: 90,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    gap: 6,
  },
  tipoSelecionado: {
    backgroundColor: '#E5F7ED',
    borderColor: VERDE,
  },
  tipoIcone: {
    fontSize: 22,
  },
  tipoTexto: {
    color: '#44516A',
    fontSize: 13,
    fontWeight: '500',
  },
  tipoTextoSelecionado: {
    color: '#168553',
    fontWeight: 'bold',
  },
  textArea: {
    minHeight: 140,
    paddingTop: 14,
  },
  contador: {
    color: '#849087',
    fontSize: 11,
    textAlign: 'right',
    marginTop: 6,
  },
  anexos: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1E8E2',
  },
  botaoAnexo: {
    borderWidth: 1,
    borderColor: VERDE,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  botaoAnexoTexto: {
    color: '#168553',
    fontWeight: '600',
    fontSize: 13,
  },
  anonimoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 22,
    gap: 10,
  },
  anonimoTextoContainer: {
    flex: 1,
  },
  botaoEnviar: {
    backgroundColor: VERDE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  botaoEnviarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoCancelarTexto: {
    color: '#44516A',
    fontSize: 14,
    fontWeight: '600',
  },
  rodape: {
    color: '#849087',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 18,
  },
});