// Defining all the variables

const wrapper = document.querySelector(".wrapper");
const qrInput = document.querySelector(".form input");
const generateBtn = document.querySelector(".generate-btn");
const qrImg = document.querySelector(".qr-code img");
const downloadBtn = document.querySelector(".download-btn");
let isQRCodeGenerated = false;

// Generate button

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value;
    if (!qrValue) return;

    // When the image is loading, this text will show

    generateBtn.innerHTML = "Generating QR Code...";

    // QR image is retrieved from this API

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;

    isQRCodeGenerated = true; // This means that the QR code is activated

    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerHTML = "Generate QR Code";
    });
});

// When the input is empty, the image section is removed

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value) {
        wrapper.classList.remove("active");
        isQRCodeGenerated = false; // Reset the qr code status when the input is empty
    }
});

// This is the Download QR Code part

downloadBtn.addEventListener("click", function () {

    if (!isQRCodeGenerated) {
        // Display an alert or any other feedback to the user
        alert("Please generate the QR code before attempting to download.");
        return; // Exit the function if the QR code is not generated
    }

    // Fetching the specific QR code

    fetch(qrImg.src)
        .then(response => response.blob())
        .then(blob => {
            let blobUrl = URL.createObjectURL(blob);

            //Creating <a> link

            let downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = 'qrcode.png';  // Set the filename

            document.body.appendChild(downloadLink);

            //Needed for the click button to function properly

            downloadLink.click();

            document.body.removeChild(downloadLink);

            URL.revokeObjectURL(blobUrl);
        });
});
