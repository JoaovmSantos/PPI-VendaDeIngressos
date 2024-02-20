// compra.js

document.addEventListener('DOMContentLoaded', function () {
    const quantidadeIngressosInput = document.getElementById('quantidadeIngressos');
    const valorTotalSpan = document.getElementById('valorTotal');
    const valorUnitario = 35; // Valor unitário do ingresso

    // Atualiza o valor total ao alterar a quantidade de ingressos
    quantidadeIngressosInput.addEventListener('input', function () {
        const quantidade = parseInt(quantidadeIngressosInput.value) || 0;
        const total = quantidade * valorUnitario;
        valorTotalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
    });
});
