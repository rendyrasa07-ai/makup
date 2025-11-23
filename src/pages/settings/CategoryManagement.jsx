import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import { dispatchStorageEvent, STORAGE_EVENTS } from '../../utils/storageEvents';

const CategoryManagement = () => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('expense_categories');
    return saved ? JSON.parse(saved) : [
      { id: 'cosmetics', name: 'Pembelian Kosmetik', icon: 'Sparkles' },
      { id: 'salary', name: 'Gaji Asisten', icon: 'Users' },
      { id: 'transport', name: 'Biaya Transportasi', icon: 'Car' },
      { id: 'equipment', name: 'Peralatan Makeup', icon: 'Package' },
      { id: 'marketing', name: 'Marketing & Promosi', icon: 'Megaphone' },
      { id: 'other', name: 'Lainnya', icon: 'MoreHorizontal' }
    ];
  });

  const [newCategory, setNewCategory] = useState({ name: '', icon: 'Tag' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', icon: '' });

  const iconOptions = [
    'Tag', 'Sparkles', 'Users', 'Car', 'Package', 'Megaphone', 
    'MoreHorizontal', 'ShoppingBag', 'Home', 'Zap', 'Coffee', 
    'Briefcase', 'Heart', 'Star', 'DollarSign'
  ];

  useEffect(() => {
    localStorage.setItem('expense_categories', JSON.stringify(categories));
    dispatchStorageEvent(STORAGE_EVENTS.EXPENSE_CATEGORIES_UPDATED, categories);
  }, [categories]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      const id = newCategory.name.toLowerCase().replace(/\s+/g, '_');
      if (!categories.find(cat => cat.id === id)) {
        setCategories([...categories, { 
          id, 
          name: newCategory.name.trim(),
          icon: newCategory.icon 
        }]);
        setNewCategory({ name: '', icon: 'Tag' });
      }
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm(`Hapus kategori ini?`)) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleEditStart = (category) => {
    setEditingId(category.id);
    setEditData({ name: category.name, icon: category.icon });
  };

  const handleEditSave = (id) => {
    if (editData.name.trim()) {
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: editData.name.trim(), icon: editData.icon } : cat
      ));
      setEditingId(null);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({ name: '', icon: '' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Tag" size={20} color="var(--color-primary)" />
        <h3 className="font-bold text-lg">Kategori Pengeluaran</h3>
      </div>

      <form onSubmit={handleAddCategory} className="mb-4">
        <div className="flex gap-2">
          <select
            value={newCategory.icon}
            onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
            className="p-2 rounded border border-input bg-background"
          >
            {iconOptions.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1 p-2 rounded border border-input bg-background"
            placeholder="Nama kategori baru..."
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            <Icon name="Plus" size={20} />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Belum ada kategori. Tambahkan kategori pertama Anda.
          </p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded border border-border">
              {editingId === category.id ? (
                <>
                  <select
                    value={editData.icon}
                    onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                    className="p-2 rounded border border-input bg-background"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="flex-1 p-2 rounded border border-input bg-background"
                    required
                  />
                  <button
                    onClick={() => handleEditSave(category.id)}
                    className="p-2 text-success hover:bg-success/10 rounded"
                  >
                    <Icon name="Check" size={18} />
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="p-2 text-muted-foreground hover:bg-muted rounded"
                  >
                    <Icon name="X" size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Icon name={category.icon} size={18} />
                  <span className="flex-1">{category.name}</span>
                  <button
                    onClick={() => handleEditStart(category)}
                    className="p-1 text-primary hover:bg-primary/10 rounded"
                  >
                    <Icon name="Edit" size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 text-destructive hover:bg-destructive/10 rounded"
                  >
                    <Icon name="Trash" size={16} />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
