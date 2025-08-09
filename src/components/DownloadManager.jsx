import { useState, useEffect } from 'react';
import { Download, Trash2, Play, Pause } from 'lucide-react';
import './DownloadManager.css';

const DownloadManager = () => {
  const [downloads, setDownloads] = useState([]);
  const [storageUsed, setStorageUsed] = useState(0);
  const [storageLimit] = useState(5000); // 5GB en MB

  useEffect(() => {
    // Simular descargas existentes
    const mockDownloads = [
      {
        id: 1,
        title: 'Stranger Things - S4E1',
        size: 850, // MB
        progress: 100,
        status: 'completed',
        quality: '1080p',
        downloadDate: Date.now() - 1000 * 60 * 60 * 24,
        expiryDate: Date.now() + 1000 * 60 * 60 * 24 * 30,
        thumbnail: 'https://images.unsplash.com/photo-1489599162163-3fb2c0812d0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 2,
        title: 'The Witcher - S3E2',
        size: 920,
        progress: 65,
        status: 'downloading',
        quality: '1080p',
        downloadDate: Date.now(),
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      },
      {
        id: 3,
        title: 'Dark - S1E1',
        size: 780,
        progress: 0,
        status: 'paused',
        quality: '720p',
        downloadDate: Date.now(),
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
      }
    ];
    
    setDownloads(mockDownloads);
    
    // Calcular almacenamiento usado
    const used = mockDownloads
      .filter(d => d.status === 'completed')
      .reduce((total, d) => total + d.size, 0);
    setStorageUsed(used);
  }, []);

  const startDownload = (id) => {
    setDownloads(prev => 
      prev.map(download => 
        download.id === id 
          ? { ...download, status: 'downloading' }
          : download
      )
    );
    
    // Simular progreso de descarga
    const interval = setInterval(() => {
      setDownloads(prev => {
        const updated = prev.map(download => {
          if (download.id === id && download.status === 'downloading') {
            const newProgress = Math.min(download.progress + Math.random() * 10, 100);
            return {
              ...download,
              progress: newProgress,
              status: newProgress >= 100 ? 'completed' : 'downloading'
            };
          }
          return download;
        });
        
        const currentDownload = updated.find(d => d.id === id);
        if (currentDownload?.status === 'completed') {
          clearInterval(interval);
          setStorageUsed(prev => prev + currentDownload.size);
        }
        
        return updated;
      });
    }, 1000);
  };

  const pauseDownload = (id) => {
    setDownloads(prev => 
      prev.map(download => 
        download.id === id 
          ? { ...download, status: 'paused' }
          : download
      )
    );
  };

  const deleteDownload = (id) => {
    const download = downloads.find(d => d.id === id);
    if (download?.status === 'completed') {
      setStorageUsed(prev => prev - download.size);
    }
    setDownloads(prev => prev.filter(d => d.id !== id));
  };

  const formatSize = (sizeInMB) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(1)} GB`;
    }
    return `${sizeInMB} MB`;
  };

  const formatTimeRemaining = (progress, startTime) => {
    if (progress === 0) return 'Calculando...';
    
    const elapsed = (Date.now() - startTime) / 1000; // segundos
    const rate = progress / elapsed;
    const remaining = (100 - progress) / rate;
    
    if (remaining < 60) return `${Math.round(remaining)}s`;
    if (remaining < 3600) return `${Math.round(remaining / 60)}m`;
    return `${Math.round(remaining / 3600)}h`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#46d369';
      case 'downloading': return '#0071eb';
      case 'paused': return '#f5c518';
      case 'error': return '#e50914';
      default: return '#b3b3b3';
    }
  };

  return (
    <div className="download-manager">
      <div className="download-header">
        <h2>Mis Descargas</h2>
        <div className="storage-info">
          <div className="storage-bar">
            <div 
              className="storage-used"
              style={{ width: `${(storageUsed / storageLimit) * 100}%` }}
            />
          </div>
          <span className="storage-text">
            {formatSize(storageUsed)} / {formatSize(storageLimit)} usados
          </span>
        </div>
      </div>
      
      <div className="download-list">
        {downloads.length === 0 ? (
          <div className="no-downloads">
            <Download size={48} />
            <h3>No tienes descargas</h3>
            <p>Las películas y series que descargues aparecerán aquí</p>
          </div>
        ) : (
          downloads.map(download => (
            <div key={download.id} className="download-item">
              <div className="download-thumbnail">
                <img src={download.thumbnail} alt={download.title} />
                {download.status === 'completed' && (
                  <button className="play-offline">
                    <Play size={24} fill="white" />
                  </button>
                )}
              </div>
              
              <div className="download-info">
                <h3>{download.title}</h3>
                <div className="download-details">
                  <span className="quality">{download.quality}</span>
                  <span className="size">{formatSize(download.size)}</span>
                  <span 
                    className="status"
                    style={{ color: getStatusColor(download.status) }}
                  >
                    {download.status === 'completed' && 'Completado'}
                    {download.status === 'downloading' && 'Descargando'}
                    {download.status === 'paused' && 'Pausado'}
                    {download.status === 'error' && 'Error'}
                  </span>
                </div>
                
                {download.status !== 'completed' && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${download.progress}%`,
                          backgroundColor: getStatusColor(download.status)
                        }}
                      />
                    </div>
                    <span className="progress-text">
                      {Math.round(download.progress)}%
                      {download.status === 'downloading' && (
                        <span className="time-remaining">
                          {' • '}{formatTimeRemaining(download.progress, download.downloadDate)}
                        </span>
                      )}
                    </span>
                  </div>
                )}
                
                {download.expiryDate && download.status === 'completed' && (
                  <div className="expiry-info">
                    Expira el {new Date(download.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              <div className="download-actions">
                {download.status === 'paused' && (
                  <button 
                    onClick={() => startDownload(download.id)}
                    className="action-btn resume"
                  >
                    <Play size={16} />
                  </button>
                )}
                
                {download.status === 'downloading' && (
                  <button 
                    onClick={() => pauseDownload(download.id)}
                    className="action-btn pause"
                  >
                    <Pause size={16} />
                  </button>
                )}
                
                <button 
                  onClick={() => deleteDownload(download.id)}
                  className="action-btn delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DownloadManager;