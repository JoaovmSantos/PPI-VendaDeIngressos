document.addEventListener('DOMContentLoaded', function () {
    const quantidadeIngressosInput = document.getElementById('quantidadeIngressos');
    const valorTotalSpan = document.getElementById('valorTotal');
    const valorUnitarioSpan = document.getElementById('valorUnitario');
    const quantidadeDisponivelSpan = document.getElementById('quantidadeAtual');

    // Obtém a quantidade inicial de ingressos disponíveis
    let quantidadeDisponivel = parseInt(quantidadeDisponivelSpan.textContent);

    // Obtém o valor unitário da página
    const valorUnitario = parseFloat(valorUnitarioSpan.textContent);

    // Atualiza o valor total ao alterar a quantidade de ingressos
    quantidadeIngressosInput.addEventListener('input', function () {
        const quantidade = parseInt(quantidadeIngressosInput.value) || 0;
        const total = quantidade * valorUnitario;
        valorTotalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;

        // Atualiza a quantidade disponível
        if (quantidade <= quantidadeDisponivel) {
            quantidadeDisponivelSpan.textContent = (quantidadeDisponivel - quantidade).toString();
        } else {
            quantidadeIngressosInput.value = quantidadeDisponivel;
        }
    });

    // Adiciona um evento de clique ao botão de compra
    const comprarIngressosButton = document.getElementById('comprarIngressos');
    comprarIngressosButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do botão

        const quantidade = parseInt(quantidadeIngressosInput.value) || 0;

        // Verifica se há ingressos disponíveis
        if (quantidade > 0 && quantidade <= quantidadeDisponivel) {
            // Exibe um SweetAlert com os detalhes da compra
            Swal.fire({
                title: 'Confirme sua compra',
                html: `Quantidade: ${quantidade} ingresso(s)<br>Total: R$ ${(quantidade * valorUnitario).toFixed(2)}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false, // Impede o fechamento clicando fora do alerta
                allowEscapeKey: false // Impede o fechamento usando a tecla Esc
            }).then((result) => {
                if (result.isConfirmed) {
                    // A compra foi confirmada
                    quantidadeDisponivel -= quantidade;
                    quantidadeDisponivelSpan.textContent = `Quantidade disponível: ${quantidadeDisponivel}`;
                    Swal.fire('Compra realizada com sucesso!', '', 'success');
                }
            });
        } else {
            // Exibe um SweetAlert informando que não há ingressos disponíveis
            Swal.fire('Quantidade inválida ou ingressos esgotados', '', 'error');
        }
    });
});
