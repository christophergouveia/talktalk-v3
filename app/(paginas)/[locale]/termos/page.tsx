'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function TermosPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleConfirm = () => {
    if (acceptedTerms && acceptedPrivacy) {
      localStorage.setItem('talktalk_terms_accepted', 'true');
      localStorage.setItem('talktalk_privacy_accepted', 'true');
      window.location.href = '/termos/confirmar';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/30"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Termos de Uso e Privacidade
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Para usar o TalkTalk, você precisa aceitar nossos termos e política de privacidade
            </p>
          </div>

          {/* Termos de Uso */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📋 Termos de Uso</h2>
              <div className="max-h-48 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p><strong>1. Uso Responsável:</strong> O TalkTalk é uma plataforma de comunicação. Use-a de forma respeitosa e responsável.</p>
                <p><strong>2. Conteúdo:</strong> Você é responsável pelo conteúdo que compartilha. Não publique material ofensivo, ilegal ou prejudicial.</p>
                <p><strong>3. Privacidade:</strong> Respeitamos sua privacidade. As conversas são criptografadas e não armazenamos mensagens permanentemente.</p>
                <p><strong>4. Idade:</strong> Você deve ter pelo menos 13 anos para usar este serviço.</p>
                <p><strong>5. Modificações:</strong> Podemos atualizar estes termos ocasionalmente. Notificaremos sobre mudanças importantes.</p>
              </div>
            </div>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Eu li e aceito os <strong>Termos de Uso</strong> do TalkTalk
              </span>
            </label>
          </motion.div>

          {/* Política de Privacidade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🔒 Política de Privacidade</h2>
              <div className="max-h-48 overflow-y-auto text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p><strong>1. Coleta de Dados:</strong> Coletamos apenas informações necessárias para o funcionamento do serviço.</p>
                <p><strong>2. Uso de Dados:</strong> Seus dados são usados exclusivamente para melhorar sua experiência na plataforma.</p>
                <p><strong>3. Compartilhamento:</strong> Não vendemos ou compartilhamos seus dados pessoais com terceiros.</p>
                <p><strong>4. Segurança:</strong> Implementamos medidas de segurança para proteger suas informações.</p>
                <p><strong>5. Cookies:</strong> Usamos cookies essenciais para o funcionamento do site.</p>
                <p><strong>6. Direitos:</strong> Você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento.</p>
              </div>
            </div>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Eu li e aceito a <strong>Política de Privacidade</strong> do TalkTalk
              </span>
            </label>
          </motion.div>

          {/* Botões */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={handleConfirm}
              disabled={!acceptedTerms || !acceptedPrivacy}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                acceptedTerms && acceptedPrivacy
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              ✅ Confirmar e Continuar
            </button>
            
            <Link
              href="/"
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              ← Voltar ao Início
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
