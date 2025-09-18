// Sorteador de Números - JavaScript
class SorteadorNumeros {
    constructor() {
        this.historico = [];
        this.inicializarElementos();
        this.adicionarEventListeners();
    }

    inicializarElementos() {
        this.minInput = document.getElementById('min');
        this.maxInput = document.getElementById('max');
        this.quantidadeInput = document.getElementById('quantidade');
        this.numerosContainer = document.getElementById('numeros-sorteados');
        this.historicoContainer = document.getElementById('historico-lista');
        this.sortearBtn = document.getElementById('sortear');
        this.limparBtn = document.getElementById('limpar');
    }

    adicionarEventListeners() {
        this.sortearBtn.addEventListener('click', () => this.sortearNumeros());
        this.limparBtn.addEventListener('click', () => this.limparResultado());
        
        // Validação em tempo real
        [this.minInput, this.maxInput, this.quantidadeInput].forEach(input => {
            input.addEventListener('input', () => this.validarInputs());
        });
    }

    validarInputs() {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        const quantidade = parseInt(this.quantidadeInput.value);

        // Validações básicas
        if (min >= max) {
            this.maxInput.value = min + 1;
        }

        if (quantidade > 10) {
            this.quantidadeInput.value = 10;
        }

        if (quantidade < 1) {
            this.quantidadeInput.value = 1;
        }

        // Verificar se a quantidade não excede o range
        const range = max - min + 1;
        if (quantidade > range) {
            this.quantidadeInput.value = range;
        }
    }

    sortearNumeros() {
        const min = parseInt(this.minInput.value);
        const max = parseInt(this.maxInput.value);
        const quantidade = parseInt(this.quantidadeInput.value);

        // Validações finais
        if (min >= max) {
            this.mostrarErro('O número mínimo deve ser menor que o máximo!');
            return;
        }

        const range = max - min + 1;
        if (quantidade > range) {
            this.mostrarErro(`Não é possível sortear ${quantidade} números únicos no range de ${min} a ${max}!`);
            return;
        }

        // Gerar números únicos
        const numeros = this.gerarNumerosUnicos(min, max, quantidade);
        
        // Exibir resultado
        this.exibirNumeros(numeros);
        
        // Adicionar ao histórico
        this.adicionarAoHistorico(numeros);
        
        // Animação do botão
        this.animarBotao();
    }

    gerarNumerosUnicos(min, max, quantidade) {
        const numeros = [];
        const numerosDisponiveis = [];
        
        // Criar array com todos os números possíveis
        for (let i = min; i <= max; i++) {
            numerosDisponiveis.push(i);
        }
        
        // Embaralhar e pegar os primeiros N
        for (let i = 0; i < quantidade; i++) {
            const indiceAleatorio = Math.floor(Math.random() * numerosDisponiveis.length);
            numeros.push(numerosDisponiveis.splice(indiceAleatorio, 1)[0]);
        }
        
        // Ordenar os números
        return numeros.sort((a, b) => a - b);
    }

    exibirNumeros(numeros) {
        this.numerosContainer.innerHTML = '';
        
        numeros.forEach((numero, index) => {
            setTimeout(() => {
                const numeroElement = document.createElement('div');
                numeroElement.className = 'numero';
                numeroElement.textContent = numero;
                this.numerosContainer.appendChild(numeroElement);
            }, index * 100);
        });
    }

    adicionarAoHistorico(numeros) {
        const timestamp = new Date().toLocaleTimeString('pt-BR');
        const numerosTexto = numeros.join(', ');
        
        this.historico.unshift({
            numeros: numerosTexto,
            timestamp: timestamp,
            min: parseInt(this.minInput.value),
            max: parseInt(this.maxInput.value)
        });

        // Limitar histórico a 10 itens
        if (this.historico.length > 10) {
            this.historico = this.historico.slice(0, 10);
        }

        this.atualizarHistorico();
    }

    atualizarHistorico() {
        this.historicoContainer.innerHTML = '';
        
        if (this.historico.length === 0) {
            const vazio = document.createElement('div');
            vazio.className = 'vazio';
            vazio.textContent = 'Nenhum sorteio realizado ainda';
            this.historicoContainer.appendChild(vazio);
            return;
        }

        this.historico.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'historico-item';
            
            itemElement.innerHTML = `
                <div class="numeros">${item.numeros}</div>
                <div class="timestamp">${item.timestamp}</div>
            `;
            
            this.historicoContainer.appendChild(itemElement);
        });
    }

    limparResultado() {
        this.numerosContainer.innerHTML = '';
        this.historico = [];
        this.atualizarHistorico();
        
        // Resetar inputs para valores padrão
        this.minInput.value = 1;
        this.maxInput.value = 100;
        this.quantidadeInput.value = 1;
        
        // Animação do botão limpar
        this.limparBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.limparBtn.style.transform = 'scale(1)';
        }, 150);
    }

    mostrarErro(mensagem) {
        // Criar elemento de erro temporário
        const erro = document.createElement('div');
        erro.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        erro.textContent = mensagem;
        
        document.body.appendChild(erro);
        
        // Remover após 3 segundos
        setTimeout(() => {
            erro.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(erro);
            }, 300);
        }, 3000);
    }

    animarBotao() {
        this.sortearBtn.style.transform = 'scale(0.95)';
        this.sortearBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            this.sortearBtn.style.transform = 'scale(1)';
            this.sortearBtn.style.background = 'linear-gradient(135deg, #27ae60, #58d68d)';
        }, 150);
    }
}

// Funções utilitárias adicionais
function formatarNumero(numero) {
    return numero.toLocaleString('pt-BR');
}

function copiarParaClipboard(texto) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto).then(() => {
            console.log('Texto copiado para clipboard');
        });
    } else {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = texto;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Estatísticas do sorteio
class EstatisticasSorteio {
    constructor() {
        this.totalSorteios = 0;
        this.numerosMaisSorteados = {};
        this.intervalosUsados = [];
    }

    registrarSorteio(numeros, min, max) {
        this.totalSorteios++;
        
        // Registrar números sorteados
        numeros.forEach(numero => {
            this.numerosMaisSorteados[numero] = (this.numerosMaisSorteados[numero] || 0) + 1;
        });
        
        // Registrar intervalo usado
        this.intervalosUsados.push({ min, max, numeros });
    }

    obterNumeroMaisFrequente() {
        let maxFrequencia = 0;
        let numeroMaisFrequente = null;
        
        Object.entries(this.numerosMaisSorteados).forEach(([numero, frequencia]) => {
            if (frequencia > maxFrequencia) {
                maxFrequencia = frequencia;
                numeroMaisFrequente = numero;
            }
        });
        
        return { numero: numeroMaisFrequente, frequencia: maxFrequencia };
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const sorteador = new SorteadorNumeros();
    const estatisticas = new EstatisticasSorteio();
    
    // Adicionar funcionalidade de teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            sorteador.sortearNumeros();
        }
        
        if (e.key === 'Escape') {
            sorteador.limparResultado();
        }
    });
    
    // Adicionar animações CSS via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎲 Sorteador de Números carregado com sucesso!');
    console.log('Pressione Enter para sortear ou Escape para limpar');
});
