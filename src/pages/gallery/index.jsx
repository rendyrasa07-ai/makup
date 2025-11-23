import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HorizontalNavigation from '../../components/ui/HorizontalNavigation';
import BottomNavigation from '../../components/ui/BottomNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Icon from '../../components/AppIcon';
import ProjectForm from './components/ProjectForm';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './components/ProjectDetail';

const Gallery = () => {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('gallery_projects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    localStorage.setItem('gallery_projects', JSON.stringify(projects));
  }, [projects]);

  const handleSaveProject = (projectData) => {
    if (editingProject) {
      setProjects(projects.map(p => 
        p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
      ));
    } else {
      const newProject = {
        ...projectData,
        id: Date.now(),
        publicId: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
      };
      setProjects([newProject, ...projects]);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Yakin ingin menghapus project ini?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleCopyPublicLink = (project) => {
    const url = `${window.location.origin}/gallery/public/${project.publicId}`;
    navigator.clipboard.writeText(url);
    alert('Link publik berhasil disalin!');
  };

  return (
    <>
      <Helmet>
        <title>Gallery - MUA Finance Manager</title>
        <meta name="description" content="Kelola portfolio dan galeri project makeup" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <HorizontalNavigation />
        
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="Image" size={24} color="var(--color-secondary)" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    Gallery
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Kelola portfolio project Anda
                  </p>
                </div>
              </div>
              
              <QuickActionButton
                label="Tambah Project"
                icon="Plus"
                variant="primary"
                onClick={() => { setEditingProject(null); setShowForm(true); }}
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <Icon name="Info" size={20} color="var(--color-primary)" />
              <p className="text-sm text-foreground">
                Setiap project memiliki link publik yang bisa dibagikan ke klien atau media sosial
              </p>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name="Image" size={40} color="var(--color-muted-foreground)" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Belum Ada Project
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mulai tambahkan project portfolio Anda
              </p>
              <QuickActionButton
                label="Tambah Project"
                icon="Plus"
                variant="primary"
                onClick={() => setShowForm(true)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  onCopyLink={handleCopyPublicLink}
                  onViewDetail={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}
        </main>

        <BottomNavigation />

        {showForm && (
          <ProjectForm
            project={editingProject}
            onClose={() => { setShowForm(false); setEditingProject(null); }}
            onSave={handleSaveProject}
          />
        )}

        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </>
  );
};

export default Gallery;
