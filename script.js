document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("taxForm");
    const incomeInput = document.getElementById("income");
    const extraIncomeInput = document.getElementById("extraIncome");
    const ageSelect = document.getElementById("age");
    const incomeErrorIcon = document.getElementById("incomeError");
    const extraIncomeErrorIcon = document.getElementById("extraIncomeError");
    const ageErrorIcon = document.getElementById("ageError");
    const resultModal = document.getElementById("resultModal");
    const resultContent = document.getElementById("result");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form submitted");

        hideErrorIcons();

        const income = parseFloat(incomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value) || 0;
        const deductions = parseFloat(document.getElementById("deductions").value) || 0;
        const age = ageSelect.value;

        console.log("Income:", income);
        console.log("Extra Income:", extraIncome);
        console.log("Deductions:", deductions);
        console.log("Age:", age);

        if (isNaN(income) || income <= 0) {
            console.log("Invalid income");
            displayError(incomeErrorIcon);
            return;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            console.log("Invalid extra income");
            displayError(extraIncomeErrorIcon);
            return;
        }

        if (!age) {
            console.log("Invalid age");
            displayError(ageErrorIcon);
            return;
        }

        const tax = calculateTax(income, extraIncome, deductions, age);
        console.log("Tax calculated:", tax);

        resultContent.textContent = `Tax to be paid: ${tax.toFixed(2)}`;
        resultModal.classList.remove("hidden");
    });

    function calculateTax(income, extraIncome, deductions, age) {
        const totalIncome = income + extraIncome - deductions;
        let tax = 0;
        if (totalIncome > 8) {
            if (age === "lt40") {
                tax = 0.3 * (totalIncome - 8);
            } else if (age === "ib40/60") {
                tax = 0.4 * (totalIncome - 8);
            } else {
                tax = 0.1 * (totalIncome - 8);
            }
        }
        return tax;
    }

    function displayError(icon) {
        icon.style.display = "inline-block";
    }

    function hideErrorIcons() {
        incomeErrorIcon.style.display = "none";
        extraIncomeErrorIcon.style.display = "none";
        ageErrorIcon.style.display = "none";
    }

    const closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", function () {
        resultModal.classList.add("hidden");
    });

    window.addEventListener("click", function (event) {
        if (event.target === resultModal) {
            resultModal.classList.add("hidden");
        }
    });
});
