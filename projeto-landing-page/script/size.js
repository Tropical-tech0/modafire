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

// Função para capturar e salvar os dados de tamanho
function captureSizeData() {
    // Obtenha os valores selecionados dos tamanhos
    const sizeData = {
        clothingTops: document.getElementById("clothingTops").value,
        jacketCoat: document.getElementById("jacketCoat").value,
        blazer: document.getElementById("blazer").value,
        pantsShorts: document.getElementById("pantsShorts").value,
    };

    // Carregue os dados anteriores do `localStorage`
    const previousData = JSON.parse(localStorage.getItem("formData")) || {};

    // Combine os dados de tamanho com os dados anteriores
    const combinedData = {
        ...previousData,
        ...sizeData
    };

    // Salve os dados combinados no `localStorage`
    localStorage.setItem("formData", JSON.stringify(combinedData));
    console.log("Updated Data with Size:", combinedData); // Exibe os dados combinados no console

    return combinedData;
}

// Função para validar as seleções
function validateForm() {
    const form = document.getElementById("sizeForm");
    const selects = form.querySelectorAll("select");
    let allSelected = true;

    selects.forEach(select => {
        if (select.value === "") {
            allSelected = false;
        }
    });

    return allSelected;
}

// Função para avançar para a próxima etapa
function nextStep() {
    if (validateForm()) {
        captureSizeData();
        window.location.href = "package.html";
    } else {
        showNotification("Please select a size for each category.");
    }
}

// Função para voltar à página anterior
function goBack() {
    window.history.back(); // Volta à página anterior no histórico
}