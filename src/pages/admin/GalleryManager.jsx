import { useState } from 'react';
import { getAlbums, addAlbum, renameAlbum, deleteAlbum, addImageToAlbum, deleteImage } from '../../data/dataService';

export default function GalleryManager() {
  const [albums, setAlbums] = useState(() => getAlbums());
  const [newAlbumName, setNewAlbumName] = useState('');
  const [addImageModal, setAddImageModal] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const refresh = () => setAlbums(getAlbums());

  const handleAddAlbum = () => {
    if (newAlbumName.trim()) {
      addAlbum(newAlbumName.trim());
      setNewAlbumName('');
      refresh();
    }
  };

  const handleRename = (id) => {
    const name = prompt('Enter new album name:');
    if (name) { renameAlbum(id, name); refresh(); }
  };

  const handleDeleteAlbum = (id) => {
    if (confirm('Delete this album and all its images?')) { deleteAlbum(id); refresh(); }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      addImageToAlbum(addImageModal, imageUrl.trim(), imageCaption.trim() || 'Photo');
      setAddImageModal(null);
      setImageUrl('');
      setImageCaption('');
      refresh();
    }
  };

  const handleImageUpload = (albumId, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        addImageToAlbum(albumId, ev.target.result, file.name.split('.')[0]);
        refresh();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (albumId, imageId) => {
    if (confirm('Delete this image?')) { deleteImage(albumId, imageId); refresh(); }
  };

  return (
    <div>
      <h1 className="admin-page-title">Gallery Manager</h1>

      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Create New Album</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" placeholder="Album name..." value={newAlbumName} onChange={e => setNewAlbumName(e.target.value)} style={{ flex: 1 }} />
          <button className="btn btn-primary" onClick={handleAddAlbum}>Create Album</button>
        </div>
      </div>

      {albums.map(album => (
        <div key={album.id} className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontWeight: 600, fontSize: '1.1rem' }}>📁 {album.name} <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 400 }}>({album.images.length} images)</span></h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer' }}>
                📤 Upload
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(album.id, e)} />
              </label>
              <button className="btn btn-secondary btn-sm" onClick={() => setAddImageModal(album.id)}>🔗 Add URL</button>
              <button className="btn btn-secondary btn-sm" onClick={() => handleRename(album.id)}>✏️ Rename</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAlbum(album.id)}>🗑️ Delete</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem' }}>
            {album.images.map(img => (
              <div key={img.id} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', aspectRatio: '1', background: 'var(--bg-tertiary)' }}>
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button onClick={() => handleDeleteImage(album.id, img.id)}
                  style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: 24, height: 24, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {addImageModal && (
        <div className="modal-overlay" onClick={() => setAddImageModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">Add Image by URL</h3>
            <form onSubmit={handleAddImage} className="admin-form">
              <div className="form-group full-width">
                <label>Image URL</label>
                <input type="url" placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
              </div>
              <div className="form-group full-width">
                <label>Caption</label>
                <input type="text" placeholder="Photo caption..." value={imageCaption} onChange={e => setImageCaption(e.target.value)} />
              </div>
              <div className="admin-form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setAddImageModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
