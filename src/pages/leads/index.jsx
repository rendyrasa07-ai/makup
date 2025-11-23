
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import LeadsForm from './LeadsForm';
import WhatsAppTemplates from './WhatsAppTemplates';

const Leads = () => {
    const [activeTab, setActiveTab] = useState('list'); // list, form, templates
    const [leads, setLeads] = useState(() => {
        const saved = localStorage.getItem('leads');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Budi Santoso', phone: '08123456789', status: 'New', source: 'Instagram', notes: '' },
            { id: 2, name: 'Ani Wijaya', phone: '08987654321', status: 'Contacted', source: 'Referral', notes: '' },
        ];
    });
    const [editingLead, setEditingLead] = useState(null);
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [selectedLeadForFollowUp, setSelectedLeadForFollowUp] = useState(null);

    useEffect(() => {
        localStorage.setItem('leads', JSON.stringify(leads));
    }, [leads]);

    const handleSaveLead = (leadData) => {
        if (editingLead) {
            setLeads(leads.map(l => l.id === editingLead.id ? { ...leadData, id: editingLead.id } : l));
        } else {
            setLeads([...leads, { ...leadData, id: Date.now() }]);
        }
        setActiveTab('list');
        setEditingLead(null);
    };

    const handleDeleteLead = (id) => {
        if (window.confirm('Yakin ingin menghapus prospek ini?')) {
            setLeads(leads.filter(l => l.id !== id));
        }
    };

    const handleEditLead = (lead) => {
        setEditingLead(lead);
        setActiveTab('form');
    };

    const handleFollowUp = (lead) => {
        setSelectedLeadForFollowUp(lead);
        setShowFollowUpModal(true);
    };

    const sendWhatsApp = (template) => {
        if (!selectedLeadForFollowUp) return;

        let message = template.content
            .replace('[Nama]', selectedLeadForFollowUp.name)
            .replace('[Tanggal]', new Date().toLocaleDateString('id-ID'));

        const url = `https://wa.me/${selectedLeadForFollowUp.phone.replace(/^0/, '62')}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setShowFollowUpModal(false);

        // Update status to Contacted if it was New
        if (selectedLeadForFollowUp.status === 'New') {
            setLeads(leads.map(l => l.id === selectedLeadForFollowUp.id ? { ...l, status: 'Contacted' } : l));
        }
    };

    const copyPublicLink = () => {
        const url = `${window.location.origin}/public-lead-form`;
        navigator.clipboard.writeText(url);
        alert('Link formulir publik berhasil disalin!');
    };

    return (
        <>
            <Helmet>
                <title>Prospek - MUA Finance Manager</title>
            </Helmet>
            <div className="min-h-screen bg-background">
                <HorizontalNavigation />
                <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon name="Users" size={24} color="var(--color-primary)" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                                        Prospek
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        Kelola calon klien potensial Anda
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={copyPublicLink}
                                    className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm"
                                >
                                    <Icon name="Link" size={18} />
                                    Link Publik
                                </button>
                                <QuickActionButton
                                    label="Tambah Prospek"
                                    icon="Plus"
                                    variant="primary"
                                    onClick={() => { setEditingLead(null); setActiveTab('form'); }}
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-border mb-6 overflow-x-auto">
                            <button
                                className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab('list')}
                            >
                                Daftar Prospek
                            </button>
                            <button
                                className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'templates' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                                onClick={() => setActiveTab('templates')}
                            >
                                Template Chat
                            </button>
                        </div>
                    </div>

                    {activeTab === 'list' && (
                        <div className="grid gap-4">
                            {leads.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    Belum ada data prospek. Tambahkan prospek baru atau bagikan link publik.
                                </div>
                            ) : (
                                leads.map((lead) => (
                                    <div key={lead.id} className="p-4 bg-card border border-border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg">{lead.name}</h3>
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${lead.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                    lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                        lead.status === 'Booked' ? 'bg-green-100 text-green-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {lead.status}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground text-sm flex items-center gap-1">
                                                <Icon name="Phone" size={14} /> {lead.phone}
                                            </p>
                                            <p className="text-muted-foreground text-xs mt-1">
                                                Sumber: {lead.source}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                onClick={() => handleFollowUp(lead)}
                                                className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                                            >
                                                <Icon name="MessageCircle" size={16} />
                                                Follow Up
                                            </button>
                                            <button
                                                onClick={() => handleEditLead(lead)}
                                                className="p-2 hover:bg-muted rounded text-blue-500"
                                            >
                                                <Icon name="Edit" size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteLead(lead.id)}
                                                className="p-2 hover:bg-muted rounded text-red-500"
                                            >
                                                <Icon name="Trash" size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'form' && (
                        <LeadsForm
                            onSave={handleSaveLead}
                            onCancel={() => setActiveTab('list')}
                            initialData={editingLead}
                        />
                    )}

                    {activeTab === 'templates' && (
                        <WhatsAppTemplates />
                    )}
                </main>
                <BottomNavigation />

                {/* Follow Up Modal */}
                {showFollowUpModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-card w-full max-w-md rounded-lg p-6">
                            <h3 className="text-lg font-bold mb-4">Pilih Template Pesan</h3>
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                                {JSON.parse(localStorage.getItem('whatsapp_templates') || '[]').map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => sendWhatsApp(template)}
                                        className="w-full text-left p-3 rounded border border-border hover:bg-muted transition-colors"
                                    >
                                        <div className="font-bold text-sm">{template.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{template.content}</div>
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        const url = `https://wa.me/${selectedLeadForFollowUp.phone.replace(/^0/, '62')}`;
                                        window.open(url, '_blank');
                                        setShowFollowUpModal(false);
                                    }}
                                    className="w-full text-left p-3 rounded border border-border hover:bg-muted transition-colors text-primary"
                                >
                                    <div className="font-bold text-sm">Chat Manual (Tanpa Template)</div>
                                </button>
                            </div>
                            <button
                                onClick={() => setShowFollowUpModal(false)}
                                className="mt-4 w-full py-2 border border-input rounded hover:bg-muted"
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Leads;
