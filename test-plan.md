## Test Plan

* [x] Agents
  * [x] Displays a list of the agents with basic information from the backend service
  * [x] Includes a button/link to display to the Add Agent view
  * [x] For each agent, includes buttons/links to display the Edit Agent and Delete Agent views
* [x] Add Agent
  * [x] Displays a form for the user to enter an agent's information
  * [x] Includes a button to submit the form
  * [x] Includes a button/link to cancel the add operation and return to the list of agents
  * [x] API validation errors are displayed in the UI when submitting bad data
  * [x] An agent's information can be entered into the form and when the form is submitted, the agent is added to the backend service
* [x] Edit Agent
  * [x] Displays a form for the user to edit an agent's information
  * [x] Includes a button to submit the form
  * [x] Includes a link to cancel the edit operation and return to the list of agents
  * [x] The form pre-populates with the agent's current information
  * [x] API validation errors are displayed in the UI when submitting bad data
  * [x] The agent's information can be changed in the form and when the form is submitted, the agent is updated in the backend service
* [x] Delete Agent
  * [x] Displays an agent's basic information
  * [x] Displays a delete confirmation message
  * [x] Includes a button to complete the delete operation
  * [x] Includes a link to cancel the delete operation and return to the list of agents
  * [x] Proceeding with the delete operation removes the agent from the backend service