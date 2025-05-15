/**
 * ReVive IMPACT - Unified JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load header component
  loadHeader();
  
  // Initialize the page
  initializePage();
  
  // Setup event listeners
  setupEventListeners();
  
  // Initialize action bar search if the element exists
  // This will work after the header is loaded
  setTimeout(initActionBarSearch, 500);
});

/**
 * Load the header component
 */
function loadHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  
  // Fetch the header HTML
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load header');
      }
      return response.text();
    })
    .then(html => {
      // Insert the header HTML
      headerContainer.innerHTML = html;
      
      // Configure the filter controls in the secondary action bar
      configureFilterControls();
      
      // Setup header event listeners
      setupHeaderEventListeners();
      
      // Initialize action bar search after header is loaded
      initActionBarSearch();
    })
    .catch(error => {
      console.error('Error loading header:', error);
      headerContainer.innerHTML = '<p>Error loading header. Please refresh the page.</p>';
    });
}

/**
 * Configure filter controls within the secondary action bar
 */
function configureFilterControls() {
  const secondaryActionBarLeft = document.querySelector('.secondary-action-bar-left');
  if (!secondaryActionBarLeft) return;
  
  // Move the filter controls to the secondary action bar
  const filterControls = document.querySelector('.filter-controls');
  if (filterControls) {
    secondaryActionBarLeft.appendChild(filterControls);
  }
}

/**
 * Setup event listeners for header components
 */
function setupHeaderEventListeners() {
  // Client search functionality in the header (original location)
  setupClientSearchInHeader();
  
  // Sign out button
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', function() {
      alert('Sign out functionality would be implemented in a production environment.');
    });
  }
}

/**
 * Setup client search functionality in header
 */
function setupClientSearchInHeader() {
  // Client search functionality
  const searchInput = document.getElementById('clientSearchInput');
  const suggestionsContainer = document.getElementById('searchSuggestions');
  
  if (searchInput && suggestionsContainer) {
    // Show suggestions as user types
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      
      // Clear suggestions if query is empty
      if (query === '') {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
        return;
      }
      
      // Filter clients based on input
      const filteredClients = contactLogData.map(entry => entry.client)
        .filter((client, index, self) => self.indexOf(client) === index) // Get unique clients
        .filter(client => client.toLowerCase().includes(query));
      
      // Render suggestions
      renderClientSuggestions(filteredClients, query, suggestionsContainer, searchInput);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (e.target !== searchInput && e.target !== suggestionsContainer) {
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';
      }
    });
  }
}

/**
 * Initialize action bar search functionality
 */
function initActionBarSearch() {
  const searchInput = document.getElementById('actionBarClientSearch');
  const suggestionsContainer = document.getElementById('actionBarSearchSuggestions');
  
  if (!searchInput || !suggestionsContainer) {
    return; // Not an error - elements might not exist on all pages
  }
  
  // Show suggestions as user types
  searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    
    // Clear suggestions if query is empty
    if (query === '') {
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.style.display = 'none';
      return;
    }
    
    // Use contactLogData if available, otherwise use a default set of clients
    let clients = [];
    
    if (typeof contactLogData !== 'undefined') {
      // Get unique clients from contactLogData
      clients = contactLogData.map(entry => ({ 
        id: entry.clientId || entry.id || Math.random().toString(36).substr(2, 9),
        name: entry.client
      }))
      .filter((client, index, self) => 
        self.findIndex(c => c.name === client.name) === index
      );
    } else {
      // Default set of clients if contactLogData is not available
      clients = [
        { id: 1, name: 'Thiago Schmidt' },
        { id: 2, name: 'Emma Taylor' },
        { id: 3, name: 'William Johnson' },
        { id: 4, name: 'Olivia Martinez' },
        { id: 5, name: 'Noah Kim' },
        { id: 6, name: 'Mia Patel' }
      ];
    }
    
    // Filter clients based on input
    const filteredClients = clients.filter(client => {
      return client.name.toLowerCase().includes(query);
    });
    
    // Render suggestions
    renderClientSuggestions(
      filteredClients.map(client => client.name), 
      query, 
      suggestionsContainer, 
      searchInput,
      function(clientName) {
        // Find the client ID
        const client = clients.find(c => c.name === clientName);
        if (client) {
          navigateToClientRecord(client.id);
        } else {
          filterTableByClient(clientName);
        }
      }
    );
  });
  
  // Close suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== searchInput && e.target !== suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
      suggestionsContainer.style.display = 'none';
    }
  });
  
  // Handle keyboard navigation
  searchInput.addEventListener('keydown', function(e) {
    handleSearchKeyboardNavigation(e, suggestionsContainer, searchInput);
  });
}

/**
 * Handle keyboard navigation for search
 */
function handleSearchKeyboardNavigation(e, suggestionsContainer, searchInput) {
  const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
  
  if (suggestions.length === 0) return;
  
  // Enter key
  if (e.key === 'Enter') {
    e.preventDefault();
    
    const activeItem = suggestionsContainer.querySelector('.suggestion-item.selected');
    if (activeItem) {
      activeItem.click();
    } else if (suggestions.length > 0) {
      suggestions[0].click();
    }
  }
  
  // DOWN key
  else if (e.key === 'ArrowDown') {
    e.preventDefault();
    
    const activeItem = suggestionsContainer.querySelector('.suggestion-item.selected');
    if (!activeItem) {
      suggestions[0].classList.add('selected');
    } else {
      const index = Array.from(suggestions).indexOf(activeItem);
      if (index < suggestions.length - 1) {
        activeItem.classList.remove('selected');
        suggestions[index + 1].classList.add('selected');
      }
    }
  }
  
  // UP key
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    
    const activeItem = suggestionsContainer.querySelector('.suggestion-item.selected');
    if (activeItem) {
      const index = Array.from(suggestions).indexOf(activeItem);
      if (index > 0) {
        activeItem.classList.remove('selected');
        suggestions[index - 1].classList.add('selected');
      }
    }
  }
  
  // Escape key
  else if (e.key === 'Escape') {
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.style.display = 'none';
  }
}

/**
 * Render client suggestions for search
 */
function renderClientSuggestions(clients, query, container, inputElement, onSelectCallback) {
  // Clear previous suggestions
  container.innerHTML = '';
  
  if (clients.length === 0) {
    container.style.display = 'none';
    return;
  }
  
  // Create and append suggestion items
  clients.forEach(client => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    
    // Highlight matching text
    item.innerHTML = highlightMatch(client, query);
    
    // Handle click on suggestion
    item.addEventListener('click', function() {
      inputElement.value = client;
      container.innerHTML = '';
      container.style.display = 'none';
      
      // Handle selection
      if (typeof onSelectCallback === 'function') {
        onSelectCallback(client);
      } else {
        // Default behavior - filter table
        filterTableByClient(client);
      }
    });
    
    container.appendChild(item);
  });
  
  // Show suggestions container
  container.style.display = 'block';
}

/**
 * Navigate to client record page
 * @param {number|string} clientId - The client ID
 */
function navigateToClientRecord(clientId) {
  console.log(`Navigating to client record: ${clientId}`);
  window.location.href = `clientLogHistory.html?id=${clientId}`;
}

/**
 * Initialize the page content
 */
function initializePage() {
  // Populate provider filter dropdown
  populateProviderFilter();
  
  // Render the contact log table
  renderContactLogTable();
}

/**
 * Populate the provider filter dropdown with unique providers
 */
function populateProviderFilter() {
  const providerFilter = document.getElementById('providerFilter');
  if (!providerFilter) return;
  
  // Get unique providers from the data
  const uniqueProviders = [...new Set(contactLogData.map(entry => entry.provider))];
  
  // Clear dropdown except for the "All" option
  while (providerFilter.options.length > 1) {
    providerFilter.remove(1);
  }
  
  // Add providers to dropdown
  uniqueProviders.forEach(provider => {
    const option = document.createElement('option');
    option.value = provider;
    option.textContent = provider;
    providerFilter.appendChild(option);
  });
}

/**
 * Render the contact log table with data
 */
function renderContactLogTable() {
  const contactLogRows = document.getElementById('contact-log-rows');
  if (!contactLogRows) return;
  
  // Clear existing rows
  contactLogRows.innerHTML = '';
  
  // Get current filters
  const showFilter = document.getElementById('showFilter')?.value || 'today';
  const providerFilter = document.getElementById('providerFilter')?.value || 'all';
  
  // Filter data based on selected filters
  let filteredData = contactLogData;
  
  // Apply show filter (date filter)
  if (showFilter !== 'all') {
    filteredData = applyDateFilter(filteredData, showFilter);
  }
  
  // Apply provider filter
  if (providerFilter !== 'all') {
    filteredData = filteredData.filter(entry => entry.provider === providerFilter);
  }
  
  // Render each row
  filteredData.forEach(entry => {
    const rowElement = createTableRow(entry);
    contactLogRows.appendChild(rowElement);
  });
  
  // If no rows after filtering, show a message
  if (filteredData.length === 0) {
    const noDataRow = document.createElement('div');
    noDataRow.className = 'table-row no-data';
    noDataRow.innerHTML = `
      <div style="padding: 20px; text-align: center; width: 100%;">
        No entries found matching the selected filters.
      </div>
    `;
    contactLogRows.appendChild(noDataRow);
  }
}

/**
 * Apply date filter to the data
 */
function applyDateFilter(data, filterType) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  switch (filterType) {
    case 'today':
      return data.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.setHours(0, 0, 0, 0) === today.getTime();
      });
      
    case 'yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return data.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.setHours(0, 0, 0, 0) === yesterday.getTime();
      });
      
    case 'thisWeek':
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return data.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfWeek;
      });
      
    case 'thisMonth':
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return data.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfMonth;
      });
      
    default:
      return data;
  }
}

/**
 * Create a table row element for a contact log entry
 */
function createTableRow(entry) {
  const rowElement = document.createElement('div');
  rowElement.className = 'table-row';
  rowElement.setAttribute('data-client-id', entry.clientId || '');
  
  // Fixed columns
  const fixedColumns = document.createElement('div');
  fixedColumns.className = 'fixed-columns';
  
  fixedColumns.innerHTML = `
    <div class="column-cell col-date">${entry.date}</div>
    <div class="column-cell col-days">${entry.daysAgo}</div>
    <div class="column-cell col-provider">${entry.provider}</div>
    <div class="column-cell col-client">${entry.client}</div>
  `;
  
  // Scrollable columns
  const scrollableColumns = document.createElement('div');
  scrollableColumns.className = 'scrollable-columns';
  
  // Format resources as a list if there are multiple
  let resourcesHtml = '';
  if (entry.resourcesGiven && entry.resourcesGiven.length > 0) {
    resourcesHtml = `<div class="resource-list">` + 
      entry.resourcesGiven.map(resource => `<span>${resource}</span>`).join('') +
      `</div>`;
  }
  
  scrollableColumns.innerHTML = `
    <div class="column-cell col-service">${entry.placeOfService || ''}</div>
    <div class="column-cell col-accompanied">${entry.accompaniedAppointment || ''}</div>
    <div class="column-cell col-documentation">${entry.obtainedDocumentation || ''}</div>
    <div class="column-cell col-resources">${resourcesHtml}</div>
    <div class="column-cell col-health">${entry.onSiteHealthCare || ''}</div>
    <div class="column-cell col-program">${entry.programStarted || ''}</div>
    <div class="column-cell col-housing">${entry.housingEntered || ''}</div>
    <div class="column-cell col-counted">${entry.countedColumns || ''}</div>
    <div class="column-cell col-notes">${entry.notes || ''}</div>
    <div class="column-cell col-status">${entry.programStatus || ''}</div>
  `;
  
  rowElement.appendChild(fixedColumns);
  rowElement.appendChild(scrollableColumns);
  
  // Make row clickable to open client dialog
  rowElement.addEventListener('click', function() {
    openClientDialog(entry.client);
  });
  
  return rowElement;
}

/**
 * Highlight matching text in search results
 */
function highlightMatch(text, query) {
  if (!query) return text;
  
  // Case insensitive search
  const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
}

/**
 * Filter table rows based on selected client
 */
function filterTableByClient(clientName) {
  // Get all table rows except the header
  const rows = document.querySelectorAll('.table-row:not(.header-row)');
  
  // Normalize the client name for comparison
  const normalizedSearch = clientName.toLowerCase();
  
  // Track if we found any matches
  let foundMatches = false;
  
  // Check each row
  rows.forEach(row => {
    // Get the client name cell from the fixed columns
    const clientCell = row.querySelector('.fixed-columns .col-client');
    if (!clientCell) return;
    
    const rowClientName = clientCell.textContent.toLowerCase();
    
    // Check if this row matches the search
    if (rowClientName.includes(normalizedSearch)) {
      row.style.display = ''; // Show matching row
      foundMatches = true;
    } else {
      row.style.display = 'none'; // Hide non-matching row
    }
  });
  
  // If no matches found, show a message
  if (!foundMatches) {
    alert(`No entries found for client: ${clientName}`);
  }
}

/**
 * Open client dialog for a selected client
 */
function openClientDialog(clientName) {
  const dialog = document.getElementById('clientDialog');
  const dialogClientName = document.getElementById('dialogClientName');
  
  if (!dialog || !dialogClientName) return;
  
  // Set the client name in the dialog
  dialogClientName.textContent = clientName;
  
  // Show the initial options screen
  document.getElementById('dialogInitialOptions').style.display = 'block';
  document.getElementById('dialogCheckInForm').style.display = 'none';
  
  // Show the dialog
  dialog.style.display = 'flex';
  dialog.classList.add('show');
  document.body.style.overflow = 'hidden';
}

/**
 * Setup event listeners for the page
 */
function setupEventListeners() {
  // Filter change listeners
  const showFilter = document.getElementById('showFilter');
  const providerFilter = document.getElementById('providerFilter');
  
  if (showFilter) {
    showFilter.addEventListener('change', function() {
      renderContactLogTable();
    });
  }
  
  if (providerFilter) {
    providerFilter.addEventListener('change', function() {
      renderContactLogTable();
    });
  }
  
  // Quick Check-In button
  const quickCheckInBtn = document.getElementById('quickCheckInBtn');
  if (quickCheckInBtn) {
    quickCheckInBtn.addEventListener('click', function() {
      // In a production environment, this would open a form to create a new check-in
      alert('Quick Check-In functionality would be implemented in a production environment.');
    });
  }
  
  // Dialog close buttons
  const dialogCloseBtn = document.getElementById('dialogCloseBtn');
  const initialCancelBtn = document.getElementById('initialCancelBtn');
  const dialogCancelBtn = document.getElementById('dialogCancelBtn');
  
  if (dialogCloseBtn) {
    dialogCloseBtn.addEventListener('click', closeClientDialog);
  }
  
  if (initialCancelBtn) {
    initialCancelBtn.addEventListener('click', closeClientDialog);
  }
  
  if (dialogCancelBtn) {
    dialogCancelBtn.addEventListener('click', closeClientDialog);
  }
  
  // Client History button
  const clientHistoryBtn = document.getElementById('clientHistoryBtn');
  if (clientHistoryBtn) {
    clientHistoryBtn.addEventListener('click', function() {
      const clientName = document.getElementById('dialogClientName').textContent;
      // In a production environment, this would navigate to the client history page
      alert(`Navigating to client history for: ${clientName}`);
    });
  }
  
  // Quick Check-In dialog button
  const dialogQuickCheckInBtn = document.querySelector('#dialogInitialOptions #quickCheckInBtn');
  if (dialogQuickCheckInBtn) {
    dialogQuickCheckInBtn.addEventListener('click', function() {
      document.getElementById('dialogInitialOptions').style.display = 'none';
      document.getElementById('dialogCheckInForm').style.display = 'block';
    });
  }
  
  // Submit button in dialog
  const dialogSubmitBtn = document.getElementById('dialogSubmitBtn');
  if (dialogSubmitBtn) {
    dialogSubmitBtn.addEventListener('click', function() {
      // In a production environment, this would submit the form data
      alert('Form submitted successfully!');
      
      // Close the dialog
      closeClientDialog();
    });
  }
  
  // Column header sorting
  const sortableHeaders = document.querySelectorAll('.column-header.sortable');
  sortableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const sortBy = this.getAttribute('data-sort');
      sortTable(sortBy);
    });
  });
  
  // Table drag scrolling
  const tableContent = document.querySelector('.table-content');
  if (tableContent) {
    initTableDragScroll(tableContent);
  }
}

/**
 * Close the client dialog
 */
function closeClientDialog() {
  const dialog = document.getElementById('clientDialog');
  if (!dialog) return;
  
  dialog.classList.remove('show');
  setTimeout(() => {
    dialog.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

/**
 * Sort the table based on a column
 */
function sortTable(column) {
  // Get the current sort direction
  const header = document.querySelector(`.column-header[data-sort="${column}"]`);
  if (!header) return;
  
  const isSortedAsc = header.classList.contains('sorted-asc');
  
  // Reset all headers
  document.querySelectorAll('.column-header.sortable').forEach(h => {
    h.classList.remove('sorted-asc', 'sorted-desc');
  });
  
  // Set new sort direction
  if (isSortedAsc) {
    header.classList.add('sorted-desc');
  } else {
    header.classList.add('sorted-asc');
  }
  
  // Sort the data
  contactLogData.sort((a, b) => {
    let valA = a[column];
    let valB = b[column];
    
    // Special case for dates
    if (column === 'date') {
      valA = new Date(a.date);
      valB = new Date(b.date);
    }
    
    // Special case for numbers
    if (column === 'daysAgo' || column === 'countedColumns') {
      valA = Number(a[column]);
      valB = Number(b[column]);
    }
    
    // Compare values
    if (valA < valB) return isSortedAsc ? 1 : -1;
    if (valA > valB) return isSortedAsc ? -1 : 1;
    return 0;
  });
  
  // Re-render the table
  renderContactLogTable();
}

/**
 * Initialize drag-to-scroll functionality for the table
 */
function initTableDragScroll(element) {
  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;
  
  element.addEventListener('mousedown', function(e) {
    isDown = true;
    element.style.cursor = 'grabbing';
    startX = e.pageX - element.offsetLeft;
    startY = e.pageY - element.offsetTop;
    scrollLeft = element.scrollLeft;
    scrollTop = element.scrollTop;
    e.preventDefault();
  });
  
  element.addEventListener('mouseleave', function() {
    isDown = false;
    element.style.cursor = 'grab';
  });
  
  element.addEventListener('mouseup', function() {
    isDown = false;
    element.style.cursor = 'grab';
  });
  
  element.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    const x = e.pageX - element.offsetLeft;
    const y = e.pageY - element.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    element.scrollLeft = scrollLeft - walkX;
    element.scrollTop = scrollTop - walkY;
  });
}