//to work with sending/getting data from back end
let solarpanels = [];
let editSolarPanelId = 0;


function displayList() {
    setCurrentView()
    getSolarPanels()
        .then(data => {
            solarpanels = data;
            renderList(data);
        });
}

//GET SOLAR PANELS
function getSolarPanels() {
    fetch('http://localhost:8080/api/solarpanel') //looks inside controller class --kinda
        .then(response => {
            return response.json();
        });
}


//RENDER OUR LIST OF SOLAR PANELS
function renderList(solarPanels) { //not the solarPanel from above
    const tableBodyElement = document.getElementById('tableRows'); //this will inject to html
    const solarPanelHtml = solarPanels.map(sp => {
        return `
        <tr>
        <td>${sp.section}</td>
        <td>${sp.row} - ${sp.column}</td>
        <td>${sp.yearInstalled}</td>
        <td>${sp.material}</td>
        <td>${sp.tracking}</td>
        <td>
            <button class="btn btn-warning" onclick="handleEditPanel(${sp.id})>Edit</button>
            <button class="btn btn-danger" onclick="handleDeletePanel(${sp.id})>Delete</button>
        </td>
        </tr>
        `
    });
    tableBodyElement.innerHTML = solarPanelHtml.join('');

}

//HTTP METHODS

//DO POST

function doPost(solarPanel){
    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(solarPanel)
    };
    fetch('http://localhost:8080/api/solarpanel', init)
    .then(response => {
        if(response.status === 201 || response.status === 400){
            return response.json();
        }else{
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
    })
    .then(data =>{
        if(data.id){
            displayList();
            resetState();
        }else{
            renderErrors(data);
        }
    })
    .catch(console.log) //need clsing here maybe
}

// DO PUT
function doPut(solarPanel){
    solarPanel.id = editSolarPanelId;

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solarPanel)
    };

    fetch('http://localhost:8080/api/solarpanel', init)
    .then(response =>{
        if(response.status === 204){
            return solarPanel;
        }else if(response.status === 400){
            return response.json();
        }else{
            return Promise.reject(`Unexpected Status Code: ${response.status}`);
        }
    })
    .then(data =>{
        if(data.id){
            displayList();
            resetState();
        }else{
            renderErrors(data);
        }
    })
    .catch(console.log)
}

//CRUD

function handleAddPanel() {
    setCurrentView('Form');
}

function handleEditPanel(solarPanel){
    const solarPanel = solarpanels.find(solarPanel => solarPanel.id === solarPanelId);
    document.getElementById('section').value = solarPanel.section;
    document.getElementById('row').value = solarPanel.row;
    document.getElementById('column').value = solarPanel.column;
    document.getElementById('yearInstalled').value = solarPanel.yearInstalled;
    document.getElementById('material').value = solarPanel.material;
    document.getElementById('tracking').value = solarPanel.tracking;

    //we can also dynamically change the text on a button
    document.getElementById('formHeading').innerText = 'Update Solar Panel';
    document.getElementById('formSubmitButton').innerText = 'Update Solar Panel';
    editSolarPanelId = solarPanelId;
    setCurrentView('Form')


}

function handleSubmit(event){
    event.preventDefault();
    const section = document.getElementById('section').value; //store section inside this variable
    const row = document.getElementById('row').value;
    const column = document.getElementById('column').value;
    const yearInstalled = document.getElementById('yearInstalled').value;
    const material = document.getElementById('material').value;
    const tracking = document.getElementById('tracking').checked;

    const solarPanel ={
        section,
        row: row ? parseInt(row) : 0,
        column: column ? parseInt(column) : 0,
        yearInstalled: yearInstalled ? parseInt(yearInstalled) : 0,
        material,
        tracking
    };

    //we want to either add or update here
    if(editSolarPanelId > 0){
        doPut(solarPanel);
    }else{
        doPost(solarPanel);
    }
}

function handleDeletePanel(solarPanelId){
    const solarPanel = solarpanels.find(solarPanel => solarPanel.id = solarPanelId);
    if(confirm(`Delete Solar Panel at location: ${solarPanel.section} - ${solarPanel.row} - ${solarPanel.column}?`)){
        const init = {
            method: 'DELETE'
        };
        fetch('http://localhost:8080/api/solarpanel', init)
        .then(response =>{
            if(response.status === 204){
                displayList();
                resetState();
            }else{
                return Promise.reject(`Unexpected Status code: ${resonse.status}`);
            }
        })
        .catch(console.long)
    }

}

//HELPER METHODS


function renderErrors(errors) {
    const errorHTML = errors.map(error => `<li>${error}</li>`);
    const errorHTMLString = `<p>The FOllowing Errors Were Found:</p>
    <ul>
        ${errorHTML.join('')}    

    </ul>
    `;
    document.getElementById('error').innerHTML = errorHTMLString;
}

function resetState() {
    //reset the form
    document.getElementById('form').reset();
    //change my button text back
    document.getElementById('formSubmitButton').innerText = 'Add Solar Panel';
    document.getElementById('formHeading').innerText = 'Add Solar Panel';
    document.getElementById('error').innerHTML = '';
    editSolarPanelId = 0;
    setCurrentView('List');

}
function setCurrentView(view) {
    const formContainerElement = document.getElementById('formContainer');
    const listContainerElement = document.getElementById('listContainer');

    switch (view) {
        case 'List':
            formContainerElement.style.display = 'none';
            listContainerElement.style.display = 'block';
            break;
        case 'Form':
            formContainerElement.style.display = 'block';
            listContainerElement.style.display = 'none';
    }
}

displayList(solarpanels);