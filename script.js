document.addEventListener('DOMContentLoaded', function() {
    // Debugging awal
    console.log("Kalkulator siap digunakan!");

    // Dapatkan elemen-elemen kalkulator
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');

    // Validasi elemen
    if (!display || numberButtons.length === 0 || operatorButtons.length === 0 || !clearButton || !equalsButton) {
        console.error("Error: Ada elemen yang tidak ditemukan!");
        return;
    }

    // State kalkulator
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    // Fungsi update tampilan
    function updateDisplay() {
        display.value = currentInput;
        console.log("Display:", currentInput);
    }

    // Fungsi tambah angka
    function appendNumber(number) {
        console.log("Menambahkan angka:", number);
        
        if (shouldResetScreen || currentInput === '0') {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput += number;
        }
        
        updateDisplay();
    }

    // Fungsi pilih operator
    function setOperation(op) {
        console.log("Operator dipilih:", op);
        
        // Jika sudah ada operasi sebelumnya, hitung dulu
        if (operation !== null && !shouldResetScreen) {
            calculate();
        }
        
        previousInput = currentInput;
        operation = op;
        shouldResetScreen = true;
        
        console.log(`Operasi disimpan: ${previousInput} ${operation}`);
    }

    // Fungsi kalkulasi
    function calculate() {
        console.log("Memulai perhitungan...");
        
        // Validasi
        if (operation === null || shouldResetScreen) return;
        
        const firstNum = parseFloat(previousInput);
        const secondNum = parseFloat(currentInput);
        
        console.log(`Menghitung: ${firstNum} ${operation} ${secondNum}`);
        
        // Penanganan error
        if (isNaN(firstNum) || isNaN(secondNum)) {
            console.error("Error: Input tidak valid");
            clear();
            return;
        }
        
        let result;
        switch (operation) {
            case '+':
                result = firstNum + secondNum;
                break;
            case '-':
                result = firstNum - secondNum;
                break;
            case '*':
                result = firstNum * secondNum;
                break;
            case '/':
                if (secondNum === 0) {
                    console.error("Error: Pembagian oleh nol");
                    display.value = "Error: Div/0";
                    clear();
                    return;
                }
                result = firstNum / secondNum;
                break;
            default:
                console.error("Error: Operasi tidak dikenal");
                return;
        }
        
        // Format hasil
        currentInput = formatResult(result);
        operation = null;
        shouldResetScreen = true;
        
        console.log("Hasil perhitungan:", currentInput);
        updateDisplay();
    }

    // Fungsi format hasil
    function formatResult(num) {
        // Jika hasilnya integer, tampilkan tanpa desimal
        if (Number.isInteger(num)) {
            return num.toString();
        }
        
        // Jika desimal, batasi 4 digit dan hilangkan trailing zero
        const formatted = num.toFixed(4);
        return formatted.replace(/\.?0+$/, '');
    }

    // Fungsi clear
    function clear() {
        console.log("Mengosongkan kalkulator");
        currentInput = '0';
        previousInput = '';
        operation = null;
        shouldResetScreen = false;
        updateDisplay();
    }

    // Event listeners untuk tombol angka
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.value);
        });
    });

    // Event listeners untuk tombol operator
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            setOperation(button.value);
        });
    });

    // Event listener untuk tombol sama dengan
    equalsButton.addEventListener('click', () => {
        console.log("Tombol sama dengan diklik");
        calculate();
    });

    // Event listener untuk tombol clear
    clearButton.addEventListener('click', () => {
        clear();
    });

    // Inisialisasi tampilan
    updateDisplay();

    // Debugging akhir
    console.log("Event listeners berhasil dipasang");
    console.log("Kalkulator siap digunakan!");
});