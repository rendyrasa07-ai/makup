import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';

const WhatsAppTemplates = () => {
    const [templates, setTemplates] = useState(() => {
        const saved = localStorage.getItem('whatsapp_templates');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Salam Pembuka', content: 'Halo [Nama], terima kasih sudah menghubungi kami. Ada yang bisa kami bantu untuk rencana makeup Anda?' },
            { id: 2, name: 'Follow Up 1', content: 'Halo [Nama], bagaimana kabar Anda? Apakah masih berminat dengan layanan makeup kami?' },
            { id: 3, name: 'Konfirmasi Booking', content: 'Halo [Nama], ini konfirmasi untuk booking makeup pada tanggal [Tanggal]. Mohon segera melakukan DP ya.' }
        ];
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState(null);

    useEffect(() => {
        localStorage.setItem('whatsapp_templates', JSON.stringify(templates));
    }, [templates]);

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTemplate = {
            id: currentTemplate ? currentTemplate.id : Date.now(),
            name: formData.get('name'),
            content: formData.get('content')
        };

        if (currentTemplate) {
            setTemplates(templates.map(t => t.id === currentTemplate.id ? newTemplate : t));
        } else {
            setTemplates([...templates, newTemplate]);
        }
        setIsEditing(false);
        setCurrentTemplate(null);
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus template ini?')) {
            setTemplates(templates.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Template WhatsApp</h2>
                <button
                    onClick={() => { setCurrentTemplate(null); setIsEditing(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                    <Icon name="Plus" size={18} />
                    Tambah Template
                </button>
            </div>

            {isEditing && (
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                    <h3 className="font-bold mb-4">{currentTemplate ? 'Edit Template' : 'Template Baru'}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama Template</label>
                            <input
                                name="name"
                                defaultValue={currentTemplate?.name}
                                required
                                className="w-full p-2 rounded border border-input bg-background"
                                placeholder="Contoh: Follow Up Tertarik"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Isi Pesan</label>
                            <textarea
                                name="content"
                                defaultValue={currentTemplate?.content}
                                required
                                rows="4"
                                className="w-full p-2 rounded border border-input bg-background"
                                placeholder="Gunakan [Nama] untuk nama otomatis..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Variabel tersedia: [Nama], [Tanggal]
                            </p>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1.5 rounded border border-input hover:bg-muted"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                {templates.map(template => (
                    <div key={template.id} className="p-4 bg-card border border-border rounded-lg relative group">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => { setCurrentTemplate(template); setIsEditing(true); }}
                                className="p-1.5 hover:bg-muted rounded text-blue-500"
                            >
                                <Icon name="Edit" size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(template.id)}
                                className="p-1.5 hover:bg-muted rounded text-red-500"
                            >
                                <Icon name="Trash" size={16} />
                            </button>
                        </div>
                        <h3 className="font-bold mb-2">{template.name}</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{template.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatsAppTemplates;
