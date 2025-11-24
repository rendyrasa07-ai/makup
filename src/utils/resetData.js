/**
 * Utility untuk reset data jika terjadi error
 * Gunakan dengan hati-hati karena akan menghapus data
 */

export const resetGalleryProjects = () => {
  try {
    localStorage.removeItem('gallery_projects');
    console.log('✅ Gallery projects reset');
    return true;
  } catch (error) {
    console.error('Error resetting gallery projects:', error);
    return false;
  }
};

export const resetAllData = () => {
  if (!window.confirm('⚠️ PERINGATAN: Ini akan menghapus SEMUA data aplikasi. Lanjutkan?')) {
    return false;
  }

  try {
    const keysToKeep = ['theme', 'language']; // Keys yang tidak dihapus
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    console.log('✅ All data reset successfully');
    alert('✅ Data berhasil direset. Halaman akan di-refresh.');
    window.location.reload();
    return true;
  } catch (error) {
    console.error('Error resetting all data:', error);
    return false;
  }
};

export const exportData = () => {
  try {
    const data = {};
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      try {
        data[key] = localStorage.getItem(key);
      } catch (err) {
        console.warn(`Could not export key: ${key}`, err);
      }
    });

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `mua-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('✅ Data exported successfully');
    return true;
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        Object.keys(data).forEach(key => {
          try {
            localStorage.setItem(key, data[key]);
          } catch (err) {
            console.warn(`Could not import key: ${key}`, err);
          }
        });

        console.log('✅ Data imported successfully');
        alert('✅ Data berhasil diimport. Halaman akan di-refresh.');
        window.location.reload();
        resolve(true);
      } catch (error) {
        console.error('Error importing data:', error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      reject(error);
    };

    reader.readAsText(file);
  });
};

// Add to window for easy access from console
if (typeof window !== 'undefined') {
  window.resetGalleryProjects = resetGalleryProjects;
  window.resetAllData = resetAllData;
  window.exportData = exportData;
  window.importData = importData;
}
