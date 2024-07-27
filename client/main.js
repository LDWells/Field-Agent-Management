let agents = [];
let baseUrl = 'http://localhost:8080/api/agent';

function displayList() {
    getAgents()
        .then(data => {
            agents = data;
            renderList(data);
        });
}

function getAgents() {
    return fetch(baseUrl)
        .then(response => response.json());
}

function renderList(agents) {
    const tableBodyElement = document.getElementById('tableRows');
    const agentHtml = agents.map(sp => {
        return `
        <tr>
            <td>${sp.firstName}</td>
            <td>${sp.middleName}</td>
            <td>${sp.lastName}</td>
            <td>${sp.dob}</td>
            <td>${sp.heightInInches}</td>
            <td>
                <button class="btn btn-warning" onclick="handleEditPanel(${sp.agentId})">Edit</button>
                <button class="btn btn-danger" onclick="handleDeletePanel(${sp.agentId})">Delete</button>
            </td>
        </tr>
        `;
    });
    tableBodyElement.innerHTML = agentHtml.join('');
}

// Initialize the display list
displayList(agents);
