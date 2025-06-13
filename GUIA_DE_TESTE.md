# 🧪 GUIA DE TESTE - TalkTalk Chat Application

## ✅ Status dos Serviços (Atualizado)

- **Socket.IO Server**: ✅ HTTP rodando na porta 3005 com DATABASE_URL configurada
- **Next.js Server**: ✅ HTTP rodando na porta 3002  
- **Crypto API**: ✅ Funcionando
- **Translation API**: ✅ Funcionando com validações aprimoradas

## 🔧 Correções Implementadas

### 1. **Erro WebSocket "Transport unknown"**
- ✅ **Corrigido**: Servidor forçado para HTTP em desenvolvimento
- ✅ **Corrigido**: Adicionado carregamento de dotenv no servidor
- ✅ **Corrigido**: Configuração de transports para ['websocket', 'polling']

### 2. **Translation API 400 Error**
- ✅ **Corrigido**: linguaSelecionadaRef inicializada com 'pt'
- ✅ **Corrigido**: Carregamento automático do localStorage
- ✅ **Corrigido**: Validação robusta de targetLanguage

### 3. **Lista de Usuários Online Incompleta**
- ✅ **Corrigido**: Descriptografia correta no evento users-update
- ✅ **Corrigido**: Tratamento de erros na descriptografia

### 4. **Prisma Constraint Violations**
- ✅ **Corrigido**: Tratamento de erro P2002
- ✅ **Corrigido**: DATABASE_URL agora carregada corretamente

---

## 📋 SEQUÊNCIA DE TESTE COMPLETA

### **Teste 1: Criação e Entrada na Sala** ⭐
1. Abra http://localhost:3002
2. Clique em "Criar Sala"
3. Digite um apelido (ou deixe vazio para usar o aleatório)
4. Clique em "Criar Sala"
5. **Resultado esperado**: Sala criada e redirecionamento para o chat

### **Teste 2: Segundo Usuário** ⭐
1. Abra nova aba em http://localhost:3002
2. Clique em "Entrar em Sala"
3. Digite o código da sala criada no Teste 1
4. Digite um apelido diferente
5. Clique em "Entrar na Sala"
6. **Resultado esperado**: Conexão WebSocket bem-sucedida (sem erro 'failed')

### **Teste 3: Tradução de Mensagens** ⭐
1. Com ambos os usuários na sala:
2. No primeiro usuário: configurar idioma para "Português"
3. No segundo usuário: configurar idioma para "English"
4. Primeiro usuário envia: "Olá, como você está?"
5. Segundo usuário envia: "Hello, how are you?"
6. **Resultado esperado**: Mensagens traduzidas automaticamente, sem erro 400

### **Teste 4: Lista de Usuários Online** ⭐
1. Com 2 usuários na sala, verifique se ambos aparecem na lista "Usuários Online"
2. Abra terceira aba e entre na sala
3. Verifique se todos os 3 usuários aparecem na lista
4. Feche uma aba
5. **Resultado esperado**: Lista sempre atualizada corretamente

### **Teste 5: Limite de Usuários** ⭐
1. Com 3 usuários na sala
2. Abra quarta aba e tente entrar na sala
3. **Resultado esperado**: Mensagem "Sala está cheia (máximo 3 usuários)"

---

## 🐛 O QUE OBSERVAR

### ✅ **Sinais de Sucesso:**
- Console sem erros "WebSocket connection failed"
- Mensagens traduzidas aparecem corretamente
- Lista "Usuários Online" mostra todos os participantes
- Limite de 3 usuários é respeitado

### ❌ **Sinais de Problema:**
- Erro "Transport unknown" no console do servidor
- Erro 400 "Missing targetLanguage" na tradução
- Usuários "fantasmas" na lista online
- Mais de 3 usuários conseguem entrar na sala

---

## 🔍 **Logs para Debugging**

### **No Navegador (F12 > Console):**
```
[DEBUG] URL do Socket: http://localhost:3005
[DEBUG] Socket conectado com sucesso: [socket-id]
[DEBUG] Emitindo join-room para: [codigo-sala]
```

### **No Servidor:**
```
[DEBUG] Environment check: { DATABASE_URL: 'SET', ... }
Development mode: using HTTP server
Servidor Socket.IO rodando na porta 3005
[DEBUG] Usuários na sala: X
[DEBUG] Enviando users-update com X usuários
```

### **Na API de Tradução:**
```
[DEBUG] Requisição de tradução recebida: { targetLanguage: 'en', ... }
[DEBUG] Tradução realizada com sucesso
```

---

## 🚨 **Se Algo Der Errado:**

1. **WebSocket ainda falha**: Verificar se ambos os serviços estão HTTP
2. **Tradução 400**: Verificar se linguaSelecionada está sendo carregada
3. **Lista incompleta**: Verificar logs de users-update no servidor
4. **DB errors**: Verificar se DATABASE_URL está carregada

---

**Status**: ✅ Pronto para teste completo  
**Data**: 12 de Junho de 2025  
**Próximo passo**: Executar sequência de teste e reportar resultados
