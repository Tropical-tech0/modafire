// Variável para armazenar o estilo selecionado
let selectedStyle = "";

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

// Função para selecionar o estilo
function selectStyle(element) {
    // Remove a seleção de todos os estilos
    const allStyles = document.querySelectorAll(".style");
    allStyles.forEach(style => style.classList.remove("selected"));

    // Marca o estilo clicado como selecionado
    element.classList.add("selected");
    selectedStyle = element.getAttribute("data-style");
    console.log("Selected Style:", selectedStyle); // Exibe o estilo no console
}

// Função para avançar para a próxima etapa
function nextStep() {
    if (!selectedStyle) {
        // Exibe a notificação caso o estilo não tenha sido selecionado
        showNotification("Please select a style before continuing.", "error");
        return;
    }

    // Carrega os dados salvos do primeiro formulário
    const previousData = JSON.parse(localStorage.getItem("formData")) || {};

    // Adiciona o estilo selecionado aos dados
    const combinedData = {
        ...previousData,
        selectedStyle: selectedStyle
    };

    // Salva o conjunto de dados atualizado no localStorage
    localStorage.setItem("formData", JSON.stringify(combinedData));
    console.log("Combined Data:", combinedData); // Exibe os dados combinados no console

    // Redireciona para a próxima página
    window.location.href = "size.html"; // Atualize para o nome da próxima página
}

function goBack() {
    window.history.back(); // Volta à página anterior no histórico
}
