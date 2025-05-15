/**
 * ReVive IMPACT - Unified JavaScript File (MD3 Refactored)
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

function loadHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        console.error('Error loading header:', response.statusText);
        headerContainer.innerHTML = '<p>Error loading header. Please refresh the page.</p>';
        return;
      }
      return response.text();
    })
    .then(html => {
      if (!html) return;
      headerContainer.innerHTML = html;
      configureFilterControls();
      setupHeaderEventListeners();
      setupHamburgerMenu();
      initActionBarSearch();
    })
    .catch(error => {
      console.error('Error loading header:', error);
      headerContainer.innerHTML = '<p>Error loading header. Please refresh the page.</p>';
    });
}

function setupHamburgerMenu() {
  const btn = document.querySelector('.hamburger-menu');
  const nav = document.getElementById('nav-menu');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.classList.toggle('active');
    nav.classList.toggle('open');
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
  const searchInput = document.getElementById('headerClientSearch');
  const suggestionsContainer = document.getElementById('headerSearchSuggestions');
  
  if (!searchInput || !suggestionsContainer) {
    return; // Elements might not exist on all pages
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
      clients = Array.from(new Set(contactLogData.map(entry => entry.client)));
    }
    
    renderClientSuggestions(clients, query, suggestionsContainer, searchInput);
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
 * Initialize the client search in the action bar after header loads
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
    
    // Filter clients based on input
    const filteredClients = contactLogData.map(entry => entry.client)
      .filter((client, index, arr) => arr.indexOf(client) === index)
      .filter(client => client.toLowerCase().includes(query));
    
    renderClientSuggestions(filteredClients, query, suggestionsContainer, searchInput);
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
 * Handle keyboard navigation within client suggestions
 */
function handleSearchKeyboardNavigation(e, suggestionsContainer, searchInput) {
  const active = suggestionsContainer.querySelector('.active');
  if (!suggestionsContainer.hasChildNodes()) return;

  switch (e.key) {
    case 'ArrowDown':
      if (active) {
        const next = active.nextElementSibling;
        if (next) {
          active.classList.remove('active');
          next.classList.add('active');
        }
      } else {
        suggestionsContainer.firstChild.classList.add('active');
      }
      e.preventDefault();
      break;
    case 'ArrowUp':
      if (active) {
        const prev = active.previousElementSibling;
        if (prev) {
          active.classList.remove('active');
          prev.classList.add('active');
        }
      }
      e.preventDefault();
      break;
    case 'Enter':
      if (active) {
        e.preventDefault();
        navigateToClientRecord(active.textContent);
      }
      break;
    default:
      break;
  }
}

/**
 * Renders client suggestions under the input
 */
function renderClientSuggestions(clients, query, container, input) {
  container.innerHTML = '';
  clients.forEach(client => {
    const idx = client.toLowerCase().indexOf(query);
    const suggestion = document.createElement('div');
    suggestion.className = 'suggestion-item';
    suggestion.innerHTML = `${client.substring(0, idx)}<strong>${client.substring(idx, idx + query.length)}</strong>${client.substring(idx + query.length)}`;
    suggestion.tabIndex = 0;
    suggestion.addEventListener('click', () => navigateToClientRecord(client));
    suggestion.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') navigateToClientRecord(client);
    });
    container.appendChild(suggestion);
  });
  container.style.display = clients.length ? 'block' : 'none';
}

/**
 * Navigate to the selected client's record
 */
function navigateToClientRecord(clientName) {
  alert(`Navigating to client record for: ${clientName}`);
}

/**
 * Initializes page-specific content (e.g., populating tables, headers)
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
  
  // Clear existing options
  providerFilter.innerHTML = '<option value="all">All</option>';
  
  if (typeof contactLogData === 'undefined') return;
  
  const providers = Array.from(new Set(contactLogData.map(entry => entry.provider)));
  providers.forEach(provider => {
    const opt = document.createElement('option');
    opt.value = provider;
    opt.textContent = provider;
    providerFilter.appendChild(opt);
  });
}

/**
 * Render the contact log table rows based on filters
 */
function renderContactLogTable() {
  const contactLogRows = document.getElementById('contact-log-rows');
  if (!contactLogRows) return;
  
  // Clear existing rows
  contactLogRows.innerHTML = '';
  
  // Get current filters
  const showFilter = document.getElementById('showFilter')?.value || 'today';
  const providerFilter = document.getElementById('providerFilter')?.value || 'all';
  
  let filteredData = contactLogData;
  // Apply date and provider filters
  filteredData = applyDateFilter(filteredData, showFilter);
  if (providerFilter !== 'all') {
    filteredData = filteredData.filter(entry => entry.provider === providerFilter);
  }
  
  filteredData.forEach(entry => {
    const row = createTableRow(entry);
    contactLogRows.appendChild(row);
  });
}

/**
 * Apply date-based filtering to data array
 */
function applyDateFilter(data, filter) {
  const now = new Date();
  return data.filter(entry => {
    const entryDate = new Date(entry.date);
    switch (filter) {
      case 'today':
        return entryDate.toDateString() === now.toDateString();
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        return entryDate.toDateString() === yesterday.toDateString();
      case 'thisWeek':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        return entryDate >= weekStart && entryDate <= now;
      case 'thisMonth':
        return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });
}

/**
 * Create a table row element for a data entry
 */
function createTableRow(entry) {
  const row = document.createElement('div');
  row.className = 'table-row';

  const fixed = document.createElement('div'); fixed.className = 'fixed-columns';
  ['date', 'daysAgo', 'provider', 'client'].forEach(key => {
    const cell = document.createElement('div');
    cell.className = `column-${key}`;
    cell.textContent = entry[key];
    fixed.appendChild(cell);
  });

  const scrollable = document.createElement('div'); scrollable.className = 'scrollable-columns';
  // Append additional cells as needed
  row.appendChild(fixed);
  row.appendChild(scrollable);

  return row;
}

/**
 * Setup all page-level event listeners
 */
function setupEventListeners() {
  const showFilter = document.getElementById('showFilter');
  const providerFilter = document.getElementById('providerFilter');
  
  if (showFilter) showFilter.addEventListener('change', renderContactLogTable);
  if (providerFilter) providerFilter.addEventListener('change', renderContactLogTable);

  const clientDialog = document.getElementById('clientDialog');
  const dialogCancelBtn = document.getElementById('dialogCancelBtn');
  const initialCancelBtn = document.getElementById('initialCancelBtn');
  
  if (initialCancelBtn) initialCancelBtn.addEventListener('click', closeClientDialog);
  if (dialogCancelBtn) dialogCancelBtn.addEventListener('click', closeClientDialog);

  const clientHistoryBtn = document.getElementById('clientHistoryBtn');
  if (clientHistoryBtn) clientHistoryBtn.addEventListener('click', function() {
    const clientName = document.getElementById('dialogClientName').textContent;
    alert(`Navigating to client history for: ${clientName}`);
  });

  initTableDragScroll(document.querySelector('.table-content'));
}

/**
 * Close the client dialog
 */
function closeClientDialog() {
  const clientDialog = document.getElementById('clientDialog');
  if (!clientDialog) return;
  clientDialog.close();
}

/**
 * Handle table sorting
 */
function sortTable(dataKey) {
  contactLogData.sort((a, b) => (a[dataKey] > b[dataKey] ? 1 : -1));
  renderContactLogTable();
}

/**
 * Initialize drag-to-scroll on table
 */
function initTableDragScroll(element) {
  let isDown = false;
  let startX, startY, scrollLeft, scrollTop;

  element.addEventListener('mousedown', function(e) {
    isDown = true;
    element.style.cursor = 'grabbing';
    startX = e.pageX - element.offsetLeft;
    startY = e.pageY - element.offsetTop;
    scrollLeft = element.scrollLeft;
    scrollTop = element.scrollTop;
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

// End of MD3 Refactored code.js
