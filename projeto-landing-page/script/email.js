document.addEventListener("DOMContentLoaded", function () {
    if (typeof emailjs !== "undefined") {
        emailjs.init("_plDhaz8Wcfnjse32");

        const prices = {
            "low-profile": 110,
            "mid-range": 160,
            "top-brands": 280
        };

        const packageNames = {
            "low-profile": "Low Profile",
            "mid-range": "Mid Range",
            "top-brands": "Top Brands"
        };

        const urlsPagamento = {
            "low-profile": "https://buy.stripe.com/8wM8xBdmk3vV4a45ko",
            "mid-range": "https://buy.stripe.com/9AQaFJdmk1nNcGA4gl",
            "top-brands": "https://buy.stripe.com/dR63dh1DC9Uj5e8fZ4"
        };

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

        const formData = JSON.parse(localStorage.getItem("formData"));
        if (formData && formData.selectedPackage) {
            const selectedPackage = formData.selectedPackage;
            const price = prices[selectedPackage];
            const packageName = packageNames[selectedPackage];

            const priceElement = document.querySelector(".price");
            if (priceElement) {
                priceElement.textContent = `€${price.toFixed(2)}`;
            }

            const packageNameElement = document.querySelector(".selected-package-name");
            if (packageNameElement) {
                packageNameElement.textContent = packageName;
            }

            // Atualiza o texto para "Blazer" se o pacote for "top-brands"
            if (selectedPackage === "top-brands") {
                const outerwearLabel = document.getElementById("outerwearLabel");
                if (outerwearLabel) {
                    outerwearLabel.textContent = "Blazer";
                }
            }
        } else {
            showNotification("No package selected. Please go back and select a package.");
        }

        function captureCheckboxAndRadioData() {
            const checkBoxData = {
                tShirt: "Yes",
                buttonBlouse: "Yes",

                outerwear: document.getElementById("jacket").checked ? "Jacket" : 
                           document.getElementById("coat").checked ? "Coat" : "None",
                bottom: document.getElementById("pants").checked ? "Pants" : 
                        document.getElementById("shorts").checked ? "Shorts" : "None"
            };

            // Verifica o pacote selecionado e altera o valor de outerwear para "Blazer" se for "top-brands"
            const previousData = JSON.parse(localStorage.getItem("formData")) || {};
            if (previousData.selectedPackage === "top-brands" && checkBoxData.outerwear === "Jacket") {
                checkBoxData.outerwear = "Blazer";
            }

            const combinedData = {
                ...previousData,
                ...checkBoxData
            };

            localStorage.setItem("formData", JSON.stringify(combinedData));
            console.log("Updated Data with Checkbox and Radio:", combinedData);
            return combinedData;
        }

        function sendFormData() {
            const jacketOrCoatSelected = document.getElementById("jacket").checked || document.getElementById("coat").checked;
            const pantsOrShortsSelected = document.getElementById("pants").checked || document.getElementById("shorts").checked;

            if (!jacketOrCoatSelected) {
                showNotification("Please select the checkboxes");
                return;
            }
            if (!pantsOrShortsSelected) {
                showNotification("Please select the checkboxes");
                return;
            }

            captureCheckboxAndRadioData();
            const formData = JSON.parse(localStorage.getItem("formData"));
        
            if (!formData) {
                showNotification("No data found.");
                return;
            }
        
            const templateParams = {
                fullName: formData.fullName || "N/A",
                dateOfBirth: formData.dateOfBirth || "N/A",
                gender: formData.gender || "N/A",
                idNumber: formData.idNumber || "N/A",
                maritalStatus: formData.maritalStatus || "N/A",
                occupation: formData.occupation || "N/A",
                email: formData.email || "N/A",
                number: formData.number || "N/A",
                address: formData.address || "N/A",
                city: formData.city || "N/A",
                stateProvince: formData.stateProvince || "N/A",
                postalCode: formData.postalCode || "N/A",
                country: formData.country || "N/A",
                
                selectedStyle: formData.selectedStyle || "N/A",
                selectedPackage: formData.selectedPackage || "N/A",
                packagePrice: `€${prices[formData.selectedPackage].toFixed(2)}`,
        
                clothingTops: formData.clothingTops || "N/A",
                jacketCoat: formData.jacketCoat || "N/A",
                blazer: formData.blazer || "N/A",
                pantsShorts: formData.pantsShorts || "N/A",
                
                clothingTopSize: formData.clothingTopSize || "N/A",
                jacketCoatSize: formData.jacketCoatSize || "N/A",
                blazerSize: formData.blazerSize || "N/A",
                pantsShortsSize: formData.pantsShortsSize || "N/A",

                tShirt: formData.tShirt || "No",
                buttonBlouse: formData.buttonBlouse || "No",
                outerwear: formData.outerwear || "N/A",
                bottom: formData.bottom || "N/A",
            };
        
            emailjs.send("service_hq5sxmc", "template_00r36qg", templateParams)
                .then(function (response) {
                    console.log("Email sent successfully:", response);
        
                    const selectedPackage = formData.selectedPackage;
                    if (selectedPackage && urlsPagamento[selectedPackage]) {
                        window.location.href = urlsPagamento[selectedPackage];
                    }
                }, function (error) {
                    console.error("Error sending email:", error);
                });
        }

        const sendButton = document.getElementById("sendButton");
        if (sendButton) {
            sendButton.addEventListener("click", function () {
                console.log("Botão clicado!");
                displayAllCapturedData();
                sendFormData();
            });
        } else {
            console.error("Button not found!");
        }

        function displayAllCapturedData() {
            const data = JSON.parse(localStorage.getItem("formData"));
            if (data) {
                console.log("Data Captured So Far:", data);
            } else {
                console.log("No data captured so far.");
            }
        }
    } else {
        console.error("EmailJS was not loaded correctly.");
    }
});

function goBack() {
    window.history.back();
}
