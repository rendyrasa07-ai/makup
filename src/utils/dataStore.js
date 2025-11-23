// Centralized localStorage data management utilities

export const dataStore = {
  // Generic get/set/update functions
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  },

  // Clients management
  getClients: () => dataStore.get('clients', []),
  setClients: (clients) => dataStore.set('clients', clients),
  
  addClient: (client) => {
    const clients = dataStore.getClients();
    const newClient = { ...client, id: Date.now() };
    clients.push(newClient);
    dataStore.setClients(clients);
    return newClient;
  },

  updateClient: (id, updates) => {
    const clients = dataStore.getClients();
    const updated = clients.map(c => c.id === id ? { ...c, ...updates } : c);
    dataStore.setClients(updated);
    return updated.find(c => c.id === id);
  },

  deleteClient: (id) => {
    const clients = dataStore.getClients();
    const filtered = clients.filter(c => c.id !== id);
    dataStore.setClients(filtered);
    return true;
  },

  // Bookings management
  getBookings: () => dataStore.get('bookings', []),
  setBookings: (bookings) => dataStore.set('bookings', bookings),

  addBooking: (booking) => {
    const bookings = dataStore.getBookings();
    const newBooking = { ...booking, id: Date.now() };
    bookings.push(newBooking);
    dataStore.setBookings(bookings);
    return newBooking;
  },

  updateBooking: (id, updates) => {
    const bookings = dataStore.getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, ...updates } : b);
    dataStore.setBookings(updated);
    return updated.find(b => b.id === id);
  },

  deleteBooking: (id) => {
    const bookings = dataStore.getBookings();
    const filtered = bookings.filter(b => b.id !== id);
    dataStore.setBookings(filtered);
    return true;
  },

  // Gallery projects management
  getProjects: () => dataStore.get('gallery_projects', []),
  setProjects: (projects) => dataStore.set('gallery_projects', projects),

  addProject: (project) => {
    const projects = dataStore.getProjects();
    const newProject = {
      ...project,
      id: Date.now(),
      publicId: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    dataStore.setProjects(projects);
    return newProject;
  },

  updateProject: (id, updates) => {
    const projects = dataStore.getProjects();
    const updated = projects.map(p => p.id === id ? { ...p, ...updates } : p);
    dataStore.setProjects(updated);
    return updated.find(p => p.id === id);
  },

  deleteProject: (id) => {
    const projects = dataStore.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    dataStore.setProjects(filtered);
    return true;
  },

  getProjectByPublicId: (publicId) => {
    const projects = dataStore.getProjects();
    return projects.find(p => p.publicId === publicId);
  },

  // Payments and invoices management
  getPayments: () => dataStore.get('payments', []),
  setPayments: (payments) => dataStore.set('payments', payments),

  addPayment: (payment) => {
    const payments = dataStore.getPayments();
    const newPayment = { ...payment, id: Date.now() };
    payments.push(newPayment);
    dataStore.setPayments(payments);
    return newPayment;
  },

  getInvoices: () => dataStore.get('invoices', []),
  setInvoices: (invoices) => dataStore.set('invoices', invoices),

  addInvoice: (invoice) => {
    const invoices = dataStore.getInvoices();
    const newInvoice = { ...invoice, id: Date.now() };
    invoices.push(newInvoice);
    dataStore.setInvoices(invoices);
    return newInvoice;
  },

  // Leads management
  getLeads: () => dataStore.get('leads', []),
  setLeads: (leads) => dataStore.set('leads', leads),

  addLead: (lead) => {
    const leads = dataStore.getLeads();
    const newLead = { ...lead, id: Date.now() };
    leads.push(newLead);
    dataStore.setLeads(leads);
    return newLead;
  },

  updateLead: (id, updates) => {
    const leads = dataStore.getLeads();
    const updated = leads.map(l => l.id === id ? { ...l, ...updates } : l);
    dataStore.setLeads(updated);
    return updated.find(l => l.id === id);
  },

  deleteLead: (id) => {
    const leads = dataStore.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    dataStore.setLeads(filtered);
    return true;
  }
};
