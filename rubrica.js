



let id = 0






function apriPopUp() {
    document.getElementById("aggiungiContatto").style.display = "flex"
}

function chiudiPopUp() {
    document.getElementById("aggiungiContatto").style.display = "none"
}

let contatti = [];



function aggiungiContatti() {

    let nome = document.getElementById("inputNome").value;
    let cognome = document.getElementById("inputCognome").value;
    let telefono = document.getElementById("inputTelefono").value;


    if (!nome || !cognome || !telefono) {

        if (!nome) {
            document.getElementById("inputNome").style.border = "3px solid red";
        }
        if (!cognome) {
            document.getElementById("inputCognome").style.border = "3px solid red";
        }
        if (!telefono) {
            document.getElementById("inputTelefono").style.border = "3px solid red";
        }
        return;
    }


    let contatto = {
        nome: nome,
        cognome: cognome,
        numero: telefono,
        indice: id
    }

    contatti.push(contatto);


    document.getElementById("sezioneContatti").innerHTML +=
        `
<div class="contatto" id="${id}-contatto">
    <div style="display: flex; flex:3;">
        <h2 class="nome" id="${id}-nome">${nome}</h2>
        <h2 class="cognome" id="${id}-cognome">${cognome} </h2>
        <h2 class="telefono" id="${id}-telefono">${telefono} </h2>
    </div>
    <div style="display: flex; flex:1">
        <button type="button" id="${id}-modifica" onclick="apriModifica(${id})" class="buttonEdit">Modifica</button>
        <button type="button" id="${id}-cancella" onclick="eliminaContatto(${id})" class="buttonDelete"><i class="fa fa-remove"
                style="font-weight: 400;font-size:30px;color:#f0ecea ;"></i>
        </button>
    </div>
</div>
<div class="modifica_contatto" id="${id}-modificaContatto">
    <div style="display: flex; flex:3;">
        <input type="text" class="inputNome" id="${id}-modificaNome">
        <input type="text" class="inputCognome" id="${id}-modificaCognome">
        <input type="text" class="inputTelefono" id="${id}-modificaTelefono">
    </div>
    <div style="display: flex; flex:1">
        <button type="button" id="${id}-annulla" onclick="annulla(${id})" class="buttonCancel">Annulla</button>
        <button type="button" onclick="confermaModifica(${id})"id="${id}-conferma" class="buttonEdit">Conferma</button>
        </button>
    </div>

</div> `;

    document.getElementById("inputNome").value = "";
    document.getElementById("inputCognome").value = "";
    document.getElementById("inputTelefono").value = "";

    id++;

    chiudiPopUp()

}

console.log(contatti)


function ricercaContatti() {
    let inputSearch = document.getElementById("searchInput").value;


    if (!inputSearch) {
        for (let index = 0; index < contatti.length; index++) {
            document.getElementById(`${index}-contatto`).style.display = "flex";

        }
        return;
    }
    console.log(inputSearch)

    let listaContatti = contatti.filter((contatti) => {
        return contatti.nome.startsWith(inputSearch) || contatti.cognome.startsWith(inputSearch) || contatti.numero.startsWith(inputSearch)
    })

    console.log(listaContatti)

    let listaId = listaContatti.map((contatti) => {
        return contatti.indice;
    })

    console.log(listaId)

    for (let indice = 0; indice < contatti.length; indice++) {




        let identificativo = document.getElementById(`${indice}-contatto`).id.split("-")[0];


        if (!listaId.includes(parseInt(identificativo))) {
            document.getElementById(`${indice}-contatto`).style.display = "none";

        }
    }


}


function apriModifica(id) {


    document.getElementById(`${id}-contatto`).style.display = "none";
    document.getElementById(`${id}-modificaContatto`).style.display = "flex";

    let nome = document.getElementById(`${id}-nome`).innerHTML;
    let cognome = document.getElementById(`${id}-cognome`).innerHTML;
    let telefono = document.getElementById(`${id}-telefono`).innerHTML;


    document.getElementById(`${id}-modificaNome`).value = nome;
    document.getElementById(`${id}-modificaCognome`).value = cognome;
    document.getElementById(`${id}-modificaTelefono`).value = telefono;
};

function annulla(id) {
    document.getElementById(`${id}-contatto`).style.display = "flex";
    document.getElementById(`${id}-modificaContatto`).style.display = "none";
};

function confermaModifica(id) {
    let inputNome = document.getElementById(`${id}-modificaNome`).value
    let inputCognome = document.getElementById(`${id}-modificaCognome`).value
    let inputTelefono = document.getElementById(`${id}-modificaTelefono`).value

    document.getElementById(`${id}-nome`).innerHTML = inputNome
    document.getElementById(`${id}-cognome`).innerHTML = inputCognome
    document.getElementById(`${id}-telefono`).innerHTML = inputTelefono


    document.getElementById(`${id}-contatto`).style.display = "flex";
    document.getElementById(`${id}-modificaContatto`).style.display = "none";

}

function eliminaContatto(id) {
    document.getElementById(`${id}-contatto`).remove()
    document.getElementById(`${id}-modificaContatto`).remove()
}