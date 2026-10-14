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
  { label: 'Reclamação' },
  { label: 'Sugestão' },
  { label: 'Elogio' },
];

const categoriasReclamacao = [
  'Ar condicionado quebrado',
  'Computador quebrado',
  'Projetor com defeito',
  'Lâmpada queimada',
  'Cadeira danificada',
  'Mesa danificada',
  'Problema de limpeza',
  'Problema elétrico',
  'Problema hidráulico',
  'Outro',
];

const locais = [
  'Laboratório 1',
  'Laboratório 2',
  'Laboratório 3',
  'Laboratório 4',
  'Laboratório 5',
  'Laboratório 6',
  'Laboratório 7',
  'Laboratório 8',
  'Sala D1',
  'Sala D2',
  'Sala D3',
  'Sala D4',
  'Sala D5',
  'Sala D6',
  'Sala D7',
  'Sala D8',
  'Sala D9',
  'Sala D10',
  'Sala D11',
  'Sala D12',
  'Sala D13',
  'Sala D14',
  'Sala D15',
  'Sala D16',
];

export default function NovaManifestacaoScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('Reclamação');
  const [descricao, setDescricao] = useState('');
  const [anonima, setAnonima] = useState(false);
  const [categoria, setCategoria] = useState('');
  const [local, setLocal] = useState('');
  const [categoriaAberta, setCategoriaAberta] = useState(false);
  const [localAberto, setLocalAberto] = useState(false);

  function enviarManifestacao() {
    if (!titulo.trim() || !descricao.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o título e a descrição da manifestação.'
      );
      return;
    }

    // Gera protocolo único baseado no timestamp
    const protocolo = `OUV-2026-${String(Date.now()).slice(-6)}`;

    const novaManifestacao = {
      id: protocolo,
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      tipo,
      categoria: categoria || null,
      local: local || null,
      anonima,
      status: 'Recebida',
      protocolo,
    };

    Alert.alert(
      'Manifestação registrada!',
      'Sua manifestação foi enviada com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation?.navigate('Home', { novaManifestacao });
          },
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
          <Text style={styles.headerTitulo}>Nova Manifestação</Text>
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

        {/* Dropdown: Categoria da Reclamação (opcional) */}
        <View style={styles.campo}>
          <Text style={styles.label}>Categoria da reclamação</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setCategoriaAberta(!categoriaAberta)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.dropdownTexto,
                !categoria && styles.dropdownPlaceholder,
              ]}
            >
              {categoria || 'Selecione a categoria'}
            </Text>
            <Text style={styles.dropdownSeta}>
              {categoriaAberta ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {categoriaAberta && (
            <View style={styles.dropdownLista}>
              {categoriasReclamacao.map((item) => {
                const selecionado = categoria === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.dropdownItem,
                      selecionado && styles.dropdownItemSelecionado,
                    ]}
                    onPress={() => {
                      setCategoria(item);
                      setCategoriaAberta(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemTexto,
                        selecionado && styles.dropdownItemTextoSelecionado,
                      ]}
                    >
                      {item}
                    </Text>
                    {selecionado && (
                      <Text style={styles.dropdownCheck}>✓</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Dropdown: Local (opcional) */}
        <View style={styles.campo}>
          <Text style={styles.label}>Local da ocorrência</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setLocalAberto(!localAberto)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.dropdownTexto,
                !local && styles.dropdownPlaceholder,
              ]}
            >
              {local || 'Selecione o local'}
            </Text>
            <Text style={styles.dropdownSeta}>
              {localAberto ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>

          {localAberto && (
            <View style={styles.dropdownLista}>
              <ScrollView
                style={styles.dropdownScroll}
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                {locais.map((item) => {
                  const selecionado = local === item;
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.dropdownItem,
                        selecionado && styles.dropdownItemSelecionado,
                      ]}
                      onPress={() => {
                        setLocal(item);
                        setLocalAberto(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownItemTexto,
                          selecionado && styles.dropdownItemTextoSelecionado,
                        ]}
                      >
                        {item}
                      </Text>
                      {selecionado && (
                        <Text style={styles.dropdownCheck}>✓</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
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
    flexDirection: 'column',
    gap: 10,
  },
  tipoCard: {
    width: '100%',
    minHeight: 60,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 14,
    gap: 12,
  },
  tipoSelecionado: {
    backgroundColor: '#E5F7ED',
    borderColor: VERDE,
  },
  tipoTexto: {
    color: '#44516A',
    fontSize: 14,
    fontWeight: '500',
  },
  tipoTextoSelecionado: {
    color: '#168553',
    fontWeight: 'bold',
  },

  /* ===== Dropdowns ===== */
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownTexto: {
    fontSize: 14,
    color: '#202923',
    flex: 1,
  },
  dropdownPlaceholder: {
    color: '#97A19A',
  },
  dropdownSeta: {
    fontSize: 12,
    color: '#168553',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  dropdownLista: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE5DF',
    borderRadius: 12,
    marginTop: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  dropdownScroll: {
    maxHeight: 220,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemSelecionado: {
    backgroundColor: '#E5F7ED',
  },
  dropdownItemTexto: {
    fontSize: 13,
    color: '#44516A',
  },
  dropdownItemTextoSelecionado: {
    color: '#168553',
    fontWeight: 'bold',
  },
  dropdownCheck: {
    color: '#168553',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
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
