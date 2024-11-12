// Função para exibir notificações
function showNotification(message, type = 'error') {
    const container = document.getElementById("notification-container");

    // Cria a notificação
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerText = message;

    // Adiciona a notificação ao contêiner
    container.appendChild(notification);

    // Remove a notificação após o tempo da animação
    setTimeout(() => {
        notification.remove();
    }, 4000); // O tempo total é o mesmo da animação (4s)
}

// Função para capturar e salvar a seleção do pacote
function selectPackage(element) {
    // Seleciona o pacote clicado
    const selectedPackage = element.getAttribute("data-package");

    // Recupera os dados existentes do localStorage
    const data = JSON.parse(localStorage.getItem("formData")) || {};

    // Adiciona o pacote selecionado aos dados existentes
    data.selectedPackage = selectedPackage;

    // Salva novamente os dados atualizados no localStorage
    localStorage.setItem("formData", JSON.stringify(data));

    console.log("Pacote selecionado:", selectedPackage);

    // Remove a classe 'selected' de todos os cards
    const allCards = document.querySelectorAll('.package');
    allCards.forEach(card => card.classList.remove('selected'));

    // Adiciona a classe 'selected' ao card clicado
    element.classList.add('selected');

    // Atualiza a cor dos botões
    allCards.forEach(card => {
        const button = card.querySelector('.select-btn');
        button.style.backgroundColor = card.classList.contains('selected') ? '#B22222' : '#000';
    });
}

// Função para validar, salvar dados e avançar para a próxima página
function nextStep() {
    // Recupera todos os dados do localStorage
    const data = JSON.parse(localStorage.getItem("formData"));

    if (!data || !data.selectedPackage) {
        showNotification("You need to select a package before proceeding.");
        return;
    }

    // Exibir todos os dados salvos
    //displayAllCapturedData();

    // Avançar para a próxima página (substitua o URL conforme necessário)
    window.location.href = "payment.html";  // Substitua com o URL da próxima página
}

// Função para exibir todos os dados capturados até agora (incluindo a seleção de pacote)

function goBack() {
    window.history.back(); // Volta à página anterior no histórico
}