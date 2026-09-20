async function loadARES() {
    const ico = document.getElementById("ico").value.trim();

    if (!/^\d{8}$/.test(ico)) {
        alert("IČO musí mít 8 číslic.");
        return;
    }

    try {
        const url = `https://api.allorigins.win/raw?url=https://ares.gov.cz/ares/api/v2/subjekt/${ico}`;
        const response = await fetch(url);

        if (!response.ok) {
            alert("Subjekt nebyl nalezen.");
            return;
        }

        const data = await response.json();

        document.getElementById("nazev").value = data.obchodniJmeno || "";

        if (data.sidlo) {
            document.getElementById("adresa").value =
                `${data.sidlo.ulice || ""} ${data.sidlo.cisloDomovni || ""}, ${data.sidlo.obec || ""} ${data.sidlo.psc || ""}`;
        }

        document.getElementById("dic").value = data.dic || "";
        document.getElementById("pravniForma").value = data.pravniForma || "";

        alert("Údaje byly načteny z ARES.");
    } catch (e) {
        alert("Chyba při komunikaci s ARES.");
    }
}
