let agents = [];
let editAgentId = 0;
let baseUrl = 'http://localhost:8080/api/agent';

// Display the list of agents
function displayList() {
    getAgents()
        .then(data => {
            agents = data;
            renderList(data);
        })
        .catch(console.log); // Add error handling for the getAgents call
}

// Fetch the list of agents
function getAgents() {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(`Failed to fetch agents: ${response.status}`);
            }
            return response.json();
        });
}

// Render the list of agents in the table
function renderList(agents) {
    const tableBodyElement = document.getElementById('tableRows');
    const agentHtml = agents.map(agent => `
        <tr>
            <td>${agent.firstName}</td>
            <td>${agent.middleName}</td>
            <td>${agent.lastName}</td>
            <td>${agent.dob}</td>
            <td>${agent.heightInInches}</td>
            <td>
                <button class="btn btn-warning" onclick="handleEdit(${agent.agentId})">Edit</button>
                <button class="btn btn-danger" onclick="handleDelete(${agent.agentId})">Delete</button>
            </td>
        </tr>
    `);
    tableBodyElement.innerHTML = agentHtml.join('');
}

// Add agent request
function doPost(agent) {
    const init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
    };
    fetch('http://localhost:8080/api/agent', init)
    .then(response =>{
        if(response.status === 201 || response.status === 400){
            return response.json();
        }else{
            return Promise.reject(`Unexected Status Code: ${response.status}`);
        }
    })
    .then(data =>{
        if(data.agentId){
            displayList();
            resetState(); 
        }else{
            renderErrors(data);
        }
    })
    .catch(console.log)
}

// Update agent request
function doPut(agent) {
    agent.agentId = editAgentId;

    const init = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(agent)
    };

    fetch(`http://localhost:8080/api/agent/${editAgentId}`, init)
    .then(response =>{
        if(response.status === 204){
            return agent;
        }else if(response.status === 400){
            return response.json();
        }else{
            return Promise.reject(`Unexpected Status Code: ${respnse.status}`);
        }
    })
    .then(data =>{
        if(data.agentId){
            displayList();
            resetState();
        }else{
            renderErrors(data);
        }
    })
    .catch(console.log);
}

// Show the form panel for adding or editing
function handleAddPanel() {
    setCurrentView('Form');
}

// Handle form submission for adding or updating an agent
function handleSubmit(event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const middleName = document.getElementById('middle-name').value;
    const lastName = document.getElementById('last-name').value;
    const dob = document.getElementById('dob').value;
    const heightInInches = document.getElementById('height').value;

    const agent = {
        firstName,
        middleName,
        lastName,
        dob,
        heightInInches: heightInInches ? parseFloat(heightInInches) : 0
    };

    if (editAgentId > 0) {
        agent.agentId = editAgentId; // Add ID to the agent object for updating
        doPut(agent);
    } else {
        doPost(agent);
    }
}

// Handle deletion of an agent
function handleDelete(agentId) {
    const agent = agents.find(agent => agent.agentId === agentId);

    if (!agent) {
        console.log('Agent not found');
        return;
    }

    if (confirm(`Delete Agent: ${agent.firstName} ${agent.lastName}?`)) {
        const init = {
            method: 'DELETE'
        };

        fetch(`${baseUrl}/${agentId}`, init)
            .then(response => {
                if (response.status === 204) {
                    displayList();
                    resetState();
                    alert(`Agent: ${agent.firstName} ${agent.lastName} has been deleted.`)
                } else {
                    return Promise.reject(`Unexpected Status Code: ${response.status}`);
                }
            })
            .catch(error => {
                console.log('Error during DELETE request:', error);
                renderErrors({ general: 'Failed to delete agent. Please try again.' });
            });
    }
}

// Populate the form for editing an agent
function handleEdit(agentId) {
    const agent = agents.find(agent => agent.agentId === agentId);

    if (!agent) {
        console.log('Agent not found');
        return;
    }

    document.getElementById('first-name').value = agent.firstName;
    document.getElementById('middle-name').value = agent.middleName;
    document.getElementById('last-name').value = agent.lastName;
    document.getElementById('dob').value = agent.dob;
    document.getElementById('height').value = agent.heightInInches;

    document.getElementById('formHeading').innerText = 'Update Agent';
    document.getElementById('formSubmitButton').innerText = 'Update Agent';
    editAgentId = agentId;
    setCurrentView('Form');
}

// Render error messages
function renderErrors(errors){
    const errorsHTML = errors.map(error => `<li>${error}</li>`)
    const errorsHTMLString = `<p>The Following Errors Were Found:</p>
    <ul>
        ${errorsHTML.join('')}
    </ul>
    `;
    document.getElementById('error').innerHTML = errorsHTMLString;
}

// Reset the form and state
function resetState() {
    document.getElementById('form').reset();
    document.getElementById('formSubmitButton').innerText = 'Submit';
    document.getElementById('formHeading').innerText = 'Add an Agent';
    document.getElementById('error').innerHTML = '';
    editAgentId = 0;
    setCurrentView('List');
}

// Toggle between list and form view
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
            break;
    }
}

// Initialize the display list
displayList();
