document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("download-btn").addEventListener("click", function () {
        // Create a new JSZip instance
        var zip = new JSZip();

        // Get HTML content
        var htmlContent = document.getElementById("menu-builder").innerHTML;
        zip.file("index.html", "<!DOCTYPE html><html><head><title>Menu Builder Export</title></head><body>" + htmlContent + "</body></html>");

        // Fetch CSS content
        fetch("./style.css")
            .then(response => response.text())
            .then(cssContent => {
                zip.file("styles.css", cssContent);

                // Generate the zip file
                zip.generateAsync({ type: "blob" })
                    .then(function (content) {
                        // Create a link element
                        var link = document.createElement('a');
                        link.download = "menu_files.zip"; // Set the name of the zip file
                        link.href = window.URL.createObjectURL(content);
                        link.click();
                    });
            })
            .catch(error => {
                console.error("Error fetching CSS:", error);
            });
    });
});