
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
    const { user, signOut } = useAuth();
    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            name: '',
            contact: '',
            website: '',
            logoUrl: '',
            signatureUrl: ''
        };
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('user_profile', JSON.stringify(profileData));
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        alert('Profil berhasil disimpan!');
    };

    return (
        <>
            <Helmet>
                <title>Profil - MUA Finance Manager</title>
            </Helmet>
            <div className="min-h-screen bg-background">
                <HorizontalNavigation />
                <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon name="User" size={24} color="var(--color-primary)" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                                    Profil Saya
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Kelola informasi akun dan bisnis Anda
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground overflow-hidden">
                                    {profileData.logoUrl ? (
                                        <img src={profileData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    ) : (
                                        user?.email?.[0]?.toUpperCase() || 'U'
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{profileData.name || user?.email || 'User Name'}</h2>
                                    <p className="text-muted-foreground">Makeup Artist Professional</p>
                                </div>
                            </div>
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`px-4 py-2 rounded-md transition-colors ${isEditing
                                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                            >
                                {isEditing ? 'Simpan' : 'Edit Profil'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email (Akun)</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full p-2 rounded border border-input bg-muted text-muted-foreground"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nama Lengkap / Bisnis</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 rounded border border-input bg-background disabled:bg-muted"
                                        placeholder="Nama Bisnis MUA Anda"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Kontak (WhatsApp)</label>
                                    <input
                                        type="tel"
                                        name="contact"
                                        value={profileData.contact}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 rounded border border-input bg-background disabled:bg-muted"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Website / Portfolio Link</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={profileData.website}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full p-2 rounded border border-input bg-background disabled:bg-muted"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">URL Logo (Image Link)</label>
                                    <input
                                        type="url"
                                        name="logoUrl"
                                        value={profileData.logoUrl}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 rounded border border-input bg-background disabled:bg-muted"
                                        placeholder="https://example.com/logo.png"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">URL Tanda Tangan (Image Link)</label>
                                    <input
                                        type="url"
                                        name="signatureUrl"
                                        value={profileData.signatureUrl}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 rounded border border-input bg-background disabled:bg-muted"
                                        placeholder="https://example.com/signature.png"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border mt-6">
                                <button
                                    onClick={() => signOut()}
                                    className="w-full py-2 px-4 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
                                >
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
                <BottomNavigation />
            </div>
        </>
    );
};

export default Profile;
