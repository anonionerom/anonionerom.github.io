function handleEnterKey(event) {
    if (event.key === "Enter") {
        searchTechnique();
    }
}
function searchTechnique() {
    var query = document.getElementById("search-bar").value.toLowerCase();
    var results = [];
    var mitreData = {
        "TA0006": ["credential_access/lazagne_cred_dump.yml","credential_access/win_reg_cred_dll.yml"],
        "TA0011": ["command_and_control/win_telegram_api.yml"],
        "TA0005": ["defense_evasion/posh_ps_clear_powershell_history.yml"],
        "TA0010": ["exfiltration/net_connection_win_mega_nz.yml"],
        // Add more entries with subdirectories as needed
    };

    if (query.trim() === "") {
        // Clear results if the search query is empty
        displayResults(results);
        return;
    }

    for (var technique in mitreData) {
        if (technique.toLowerCase() === query) {
            results = mitreData[technique].map(function (yamlFile) {
                return { technique: technique, yamlFile: yamlFile };
            });
        }
    }

    if (results.length === 0) {
        for (var technique in mitreData) {
            if (technique.toLowerCase().includes(query)) {
                results.push({ technique: technique, yamlFile: mitreData[technique] });
            }
        }
    }

    displayResults(results);
}

function displayResults(results) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
    } else {
        results.forEach(function (result) {
            var resultDiv = document.createElement("div");
            var technique = result.technique;
            var yamlFiles = result.yamlFile;

            if (Array.isArray(yamlFiles)) {
                // If yamlFiles is an array (multiple files), create links for each one
                resultDiv.innerHTML = "<b>" + technique + "</b>: ";
                yamlFiles.forEach(function (yamlFile) {
                    var link = document.createElement("a");
                    link.href = yamlFile; // Set the link's href to the YAML file
                    link.textContent = yamlFile.split('/').pop(); // Set the link text to the filename
                    resultDiv.appendChild(link); // Append the link to the resultDiv
                });
            } else {
                // If there's only one YAML file, create a link for it
                var link = document.createElement("a");
                link.href = yamlFiles; // Set the link's href to the YAML file
                link.textContent = yamlFiles.split('/').pop(); // Set the link text to the filename
                resultDiv.innerHTML = "<b>" + technique + "</b>: ";
                resultDiv.appendChild(link); // Append the link to the resultDiv
            }

            resultsDiv.appendChild(resultDiv);
        });
    }
}