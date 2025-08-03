document.addEventListener('DOMContentLoaded', () => {

    const selectionView = document.getElementById('selection-view');
    const storeView = document.getElementById('store-view');
    const tabSelectionBtn = document.getElementById('tab-selection');
    const tabStoreBtn = document.getElementById('tab-store');
    const proceedToStoreBtn = document.getElementById('proceed-to-store');
    const deployTeamBtn = document.getElementById('deploy-team');
    const agentCards = document.querySelectorAll('.agent-card');
    const storeItems = document.querySelectorAll('.store-item');
    const selectedAgentsList = document.getElementById('selected-agents-list');
    const missionStatus = document.querySelector('.mission-status');
    const totalPriceDisplay = document.getElementById('total-price');

    // State management
    let selectedAgents = [];
    let selectedItems = [];
    const itemPrices = {
        'medkit': 500,
        'stealth-tech': 1500,
        'power-core': 2000,
        // Add prices for more items
    };

    // --- Tab Switching Logic ---
    tabSelectionBtn.addEventListener('click', () => {
        tabStoreBtn.classList.remove('active');
        tabSelectionBtn.classList.add('active');
        storeView.classList.remove('active');
        selectionView.classList.add('active');
    });

    tabStoreBtn.addEventListener('click', () => {
        // Only allow switching to the store if at least one agent is selected
        if (selectedAgents.length > 0) {
            tabSelectionBtn.classList.remove('active');
            tabStoreBtn.classList.add('active');
            selectionView.classList.remove('active');
            storeView.classList.add('active');
            missionStatus.textContent = `STATUS: EQUIPPING TEAM (${selectedAgents.length} agents)`;
        } else {
            alert("Please select at least one agent before proceeding to the store.");
        }
    });

    // --- Agent Selection Logic ---
    agentCards.forEach(card => {
        card.addEventListener('click', function() {
            const agentName = this.dataset.agent;

            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedAgents = selectedAgents.filter(agent => agent !== agentName);
            } else {
                this.classList.add('selected');
                selectedAgents.push(agentName);
            }
            updateSelectedAgentsList();
            updateProceedButtonState();
        });
    });

    function updateSelectedAgentsList() {
        selectedAgentsList.innerHTML = ''; // Clear the current list
        if (selectedAgents.length === 0) {
            selectedAgentsList.innerHTML = '<li><span class="placeholder-text">No agents selected.</span></li>';
            missionStatus.textContent = `STATUS: AWAITING TEAM SELECTION`;
        } else {
            selectedAgents.forEach(agent => {
                const li = document.createElement('li');
                li.textContent = agent.toUpperCase();
                selectedAgentsList.appendChild(li);
            });
            missionStatus.textContent = `STATUS: TEAM SELECTED (${selectedAgents.length} agents)`;
        }
    }

    function updateProceedButtonState() {
        if (selectedAgents.length > 0) {
            proceedToStoreBtn.style.opacity = '1';
            proceedToStoreBtn.style.pointerEvents = 'auto';
        } else {
            proceedToStoreBtn.style.opacity = '0.5';
            proceedToStoreBtn.style.pointerEvents = 'none';
        }
    }

    proceedToStoreBtn.addEventListener('click', () => {
        if (selectedAgents.length > 0) {
            tabStoreBtn.click();
        }
    });

    // --- Agent Store Logic ---
    storeItems.forEach(item => {
        const buyButton = item.querySelector('.buy-button');
        buyButton.addEventListener('click', () => {
            const itemName = item.dataset.item;
            const itemPrice = itemPrices[itemName];

            if (item.classList.contains('selected')) {
                item.classList.remove('selected');
                selectedItems = selectedItems.filter(i => i !== itemName);
            } else {
                item.classList.add('selected');
                selectedItems.push(itemName);
            }
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        let total = 0;
        selectedItems.forEach(item => {
            total += itemPrices[item];
        });
        totalPriceDisplay.textContent = `Total Cost: $${total}`;
    }

    // --- Final Deployment Logic ---
    deployTeamBtn.addEventListener('click', () => {
        if (selectedAgents.length > 0) {
            const confirmDeploy = confirm(`Confirm deployment of ${selectedAgents.length} agents with ${selectedItems.length} items? Total cost: ${totalPriceDisplay.textContent}.`);
            if (confirmDeploy) {
                alert("Deployment confirmed. Good luck, agents!");
                // In a real application, you would send this data to a server and navigate to the next page.
            }
        } else {
            alert("Please select at least one agent before deploying.");
        }
    });

    // Initial state setup
    updateSelectedAgentsList();
    updateProceedButtonState();

});
