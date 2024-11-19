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

// Função para capturar e validar os dados do formulário
function captureAndValidateData() {
    console.log("Capturing data...");
    const data = {
        fullName: document.getElementById("full-name").value.trim(),
        dateOfBirth: document.getElementById("date-of-birth").value,
        gender: document.getElementById("gender").value,
        idNumber: document.getElementById("nif-number").value.trim(),
        maritalStatus: document.getElementById("status").value,
        occupation: document.getElementById("occupation").value.trim(),
        email: document.getElementById("email").value.trim(),
        number: document.getElementById("phone-number").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        stateProvince: document.getElementById("state-province").value.trim(),
        postalCode: document.getElementById("postal-code").value.trim(),
        country: document.getElementById("country").value,
        termsAccepted: document.getElementById("terms-acceptance").checked,
        privacyPolicy: document.getElementById("privacy-policy").checked
    };

    const errors = [];

    // Validações detalhadas
    if (!data.fullName || data.fullName.length < 3) errors.push("Full Name must be at least 3 characters.");
    if (!data.dateOfBirth) errors.push("Date of Birth is required.");
    if (new Date(data.dateOfBirth) > new Date()) errors.push("Date of Birth cannot be a future date.");
    if (!["male", "female", "other"].includes(data.gender)) errors.push("Please select a valid Gender.");
    if (!data.idNumber || !validateIDNumber(data.idNumber)) errors.push("Valid NIF Number is required.");
    if (!data.maritalStatus) errors.push("Marital Status is required.");
    if (!data.occupation || data.occupation.length < 3) errors.push("Occupation must be at least 3 characters.");
    if (!data.email || !validateEmail(data.email)) errors.push("Valid Email is required.");
    if (!data.number || !validatePhoneNumber(data.number)) errors.push("Valid Phone Number is required.");
    if (!data.address) errors.push("Address is required.");
    if (!data.city) errors.push("City is required.");
    if (!data.stateProvince) errors.push("State/Province is required.");
    if (!data.postalCode || !validatePostalCode(data.postalCode)) errors.push("Valid Postal Code is required.");
    if (!data.country) errors.push("Country is required.");
    if (!data.termsAccepted) errors.push("You must accept the Terms and Conditions.");
    if (!data.privacyPolicy) errors.push("You must agree to the Privacy Policy.");

    // Exibir notificações de erro
    if (errors.length > 0) {
        errors.forEach(error => showNotification(error, 'error'));
        return false;
    }

    // Salvar os dados no localStorage
    localStorage.setItem("formData", JSON.stringify(data));
    return true;
}

// Função de validação do e-mail
function validateEmail(email) {
    const re = /^(?!.*\.{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}


// Função de validação do número de telefone
function validatePhoneNumber(phone) {
    const re = /^[0-9]+$/;
    return re.test(phone);
}

// Função de validação do NIF (exemplo)
function validateIDNumber(idNumber) {
    const re = /^[0-9]{8,12}$/; // Ajuste conforme o formato esperado do NIF
    return re.test(idNumber);
}

// Função de validação do código postal
function validatePostalCode(postalCode) {
    const re = /^[0-9\-]+$/;
    return re.test(postalCode);
}

// Função para redirecionar para a próxima página
function redirectToNextPage() {
    if (captureAndValidateData()) {
        window.location.href = "styles.html";
    }
}

function goBack() {
    window.history.back(); // Volta para a página anterior
}
