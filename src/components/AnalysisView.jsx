import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Headset,
  BarChart,
  Mic
} from '@mui/icons-material';
import { ProgressBar } from './StyledComponents';

const AnalysisView = ({ uploadState, onFileSelect, onRemoveFile, onStartAnalysis, loading, error }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: '768px', width: '100%' }}>
        <CardHeader 
          title="Analyze Conversation"
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          {/* Upload State */}
          {uploadState === 'upload' && (
            <Box 
              onClick={onFileSelect}
              sx={{ 
                border: '2px dashed #e2e8f0', 
                borderRadius: 3, 
                p: 4, 
                textAlign: 'center', 
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { 
                  borderColor: 'primary.main',
                  bgcolor: '#f8fafc' 
                }
              }}
            >
              <Box 
                sx={{ 
                  bgcolor: '#ede9fe', 
                  color: 'primary.main', 
                  width: '4rem', 
                  height: '4rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mx: 'auto', 
                  mb: 2 
                }}
              >
                <Headset fontSize="large" />
              </Box>
              <Typography variant="h3" sx={{ mb: 0.5 }}>Upload your conversation</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Drag and drop your audio file here, or click to browse.<br />
                We support MP3, WAV, and M4A formats.
              </Typography>
              <Button variant="contained" color="primary">Select Audio File</Button>
              
              <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#64748b' }}>
                <Mic sx={{ fontSize: '1rem' }} />
                <Typography variant="body2">Or use our recorder for live conversations</Typography>
              </Box>
            </Box>
          )}
          
          {/* File Selected State */}
          {uploadState === 'selected' && (
            <Box sx={{ border: '1px solid #e2e8f0', borderRadius: 2, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ bgcolor: '#ede9fe', p: 1.5, borderRadius: 1 }}>
                    <Headset sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ m: 0 }}>Sales_Call_TechCorp_April30.mp3</Typography>
                    <Typography variant="body2" sx={{ m: 0 }}>8.2 MB</Typography>
                  </Box>
                </Box>
                <Button color="error" size="small" onClick={onRemoveFile}>Remove</Button>
              </Box>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Meeting type</InputLabel>
                    <Select defaultValue="discovery" label="Meeting type">
                      <MenuItem value="discovery">Discovery Call</MenuItem>
                      <MenuItem value="demo">Demo</MenuItem>
                      <MenuItem value="followup">Follow-up</MenuItem>
                      <MenuItem value="closing">Closing</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Strategic approach</InputLabel>
                    <Select defaultValue="socratic" label="Strategic approach">
                      <MenuItem value="socratic">Socratic Method</MenuItem>
                      <MenuItem value="consultative">Consultative Selling</MenuItem>
                      <MenuItem value="spin">SPIN Selling</MenuItem>
                      <MenuItem value="solution">Solution Selling</MenuItem>
                      <MenuItem value="challenger">Challenger Sale</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              {error && (
                <Box sx={{ mb: 3, color: 'error.main', bgcolor: 'error.light', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2">{error}</Typography>
                </Box>
              )}
              
              <Box sx={{ textAlign: 'right' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={onStartAnalysis}
                  startIcon={<BarChart />}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Analyze Conversation'}
                </Button>
              </Box>
            </Box>
          )}
          
          {/* Uploading State */}
          {uploadState === 'uploading' && (
            <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
              <Box 
                sx={{ 
                  width: '4rem', 
                  height: '4rem', 
                  border: '4px solid rgba(79, 70, 229, 0.2)', 
                  borderRadius: '50%', 
                  borderTop: '4px solid #4f46e5', 
                  animation: 'spin 1s linear infinite', 
                  mx: 'auto', 
                  mb: 3,
                  '@keyframes spin': {
                    to: { transform: 'rotate(360deg)' }
                  }
                }} 
              />
              <Typography variant="h3" sx={{ mb: 0.5 }}>Uploading your file...</Typography>
              <Typography variant="body2">This should only take a moment</Typography>
            </Box>
          )}
          
          {/* Analyzing State */}
          {uploadState === 'analyzing' && (
            <Box sx={{ textAlign: 'center', py: 4, px: 2 }}>
              <Box 
                sx={{ 
                  width: '4rem', 
                  height: '4rem', 
                  border: '4px solid rgba(79, 70, 229, 0.2)', 
                  borderRadius: '50%', 
                  borderTop: '4px solid #4f46e5', 
                  animation: 'spin 1s linear infinite', 
                  mx: 'auto', 
                  mb: 3,
                  '@keyframes spin': {
                    to: { transform: 'rotate(360deg)' }
                  }
                }} 
              />
              <Typography variant="h3" sx={{ mb: 0.5 }}>Analyzing conversation</Typography>
              <Typography variant="body2" sx={{ mb: 4 }}>Our AI is extracting insights from your conversation</Typography>
              
              <Box sx={{ maxWidth: '32rem', mx: 'auto' }}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Transcribing audio</Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>Complete</Typography>
                  </Box>
                  <ProgressBar value={100} />
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Analyzing content</Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 500 }}>75%</Typography>
                  </Box>
                  <ProgressBar value={75} />
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2">Generating insights</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Waiting</Typography>
                  </Box>
                  <ProgressBar value={0} color="grey" />
                </Box>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalysisView;
