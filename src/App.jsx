import React, { useState, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Avatar,
  useTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';

// Import API service
import api from './api';

// Import components
import DashboardView from './components/DashboardView';
import AnalysisView from './components/AnalysisView';
import CompleteView from './components/CompleteView';
import InsightsView from './components/InsightsView';

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [uploadState, setUploadState] = useState('upload'); // upload, selected, uploading, analyzing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  
  // Handle view navigation
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  
  // Handle file selection and analysis flow
  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0] || null;
    
    if (file) {
      // Check file type
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/x-m4a'];
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid audio file (MP3, WAV, or M4A)');
        return;
      }
      
      // Check file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB in bytes
      if (file.size > maxSize) {
        setError('File size exceeds 50MB limit');
        return;
      }
      
      setSelectedFile(file);
      setUploadState('selected');
      setError('');
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRemoveFile = () => {
    setUploadState('upload');
    setSelectedFile(null);
    setError('');
  };
  
  const handleStartAnalysis = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }
    
    setLoading(true);
    setError('');
    setUploadState('uploading');
    setUploadProgress(0);
    
    try {
      // Upload file to Supabase
      const filePath = `audio/${Date.now()}_${selectedFile.name}`;
      const { data, error: uploadError } = await api.uploadFile(
        selectedFile, 
        filePath,
        (progress) => {
          setUploadProgress(progress);
        }
      );
      
      if (uploadError) {
        throw new Error(uploadError.message || 'File upload failed');
      }
      
      setUploadState('analyzing');
      
      // Call the backend API with the file URL
      const result = await api.sendRequest({
        action: 'analyze',
        data: {
          meetingType: 'discovery',
          approach: 'socratic',
          fileUrl: data?.publicUrl || ''
        }
      });
      
      // Log activity to Supabase
      await api.logActivity({
        action: 'analyze',
        result: 'success',
        timestamp: new Date().toISOString()
      });
      
      // Simulate analysis process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setCurrentView('complete');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'An error occurred during analysis');
      setUploadState('selected');
    } finally {
      setLoading(false);
    }
  };
  
  const handleNewAnalysis = () => {
    setCurrentView('analyze');
    setUploadState('upload');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mr: 4 }}>
            RepSpheres
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box 
              onClick={() => handleViewChange('dashboard')} 
              sx={{ 
                py: 1.5, 
                px: 2, 
                mx: 0.5, 
                borderRadius: 1.5, 
                fontWeight: 500, 
                fontSize: '0.875rem', 
                cursor: 'pointer', 
                color: currentView === 'dashboard' ? 'primary.main' : 'text.secondary',
                bgcolor: currentView === 'dashboard' ? '#ede9fe' : 'transparent',
                '&:hover': { color: currentView === 'dashboard' ? 'primary.main' : 'text.primary' }
              }}
            >
              Dashboard
            </Box>
            <Box 
              onClick={() => handleViewChange('analyze')} 
              sx={{ 
                py: 1.5, 
                px: 2, 
                mx: 0.5, 
                borderRadius: 1.5, 
                fontWeight: 500, 
                fontSize: '0.875rem', 
                cursor: 'pointer', 
                color: currentView === 'analyze' ? 'primary.main' : 'text.secondary',
                bgcolor: currentView === 'analyze' ? '#ede9fe' : 'transparent',
                '&:hover': { color: currentView === 'analyze' ? 'primary.main' : 'text.primary' }
              }}
            >
              New Analysis
            </Box>
            <Box 
              onClick={() => handleViewChange('insights')} 
              sx={{ 
                py: 1.5, 
                px: 2, 
                mx: 0.5, 
                borderRadius: 1.5, 
                fontWeight: 500, 
                fontSize: '0.875rem', 
                cursor: 'pointer', 
                color: currentView === 'insights' ? 'primary.main' : 'text.secondary',
                bgcolor: currentView === 'insights' ? '#ede9fe' : 'transparent',
                '&:hover': { color: currentView === 'insights' ? 'primary.main' : 'text.primary' }
              }}
            >
              Team Insights
            </Box>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Avatar sx={{ bgcolor: '#ede9fe', color: 'primary.main', width: '2rem', height: '2rem', fontWeight: 500 }}>
              JS
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4, flex: 1 }}>
        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <DashboardView onUploadClick={() => handleViewChange('analyze')} />
        )}
        
        {/* Analysis View */}
        {currentView === 'analyze' && (
          <AnalysisView 
            uploadState={uploadState}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            onStartAnalysis={handleStartAnalysis}
            loading={loading}
            error={error}
            selectedFile={selectedFile}
            uploadProgress={uploadProgress}
            fileInputRef={fileInputRef}
          />
        )}
        
        {/* Complete Analysis View */}
        {currentView === 'complete' && (
          <CompleteView onNewAnalysis={handleNewAnalysis} />
        )}
        
        {/* Team Insights View */}
        {currentView === 'insights' && (
          <InsightsView />
        )}
      </Container>
    </Box>
  );
};

export default App;
