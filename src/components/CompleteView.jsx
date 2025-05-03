import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Paper
} from '@mui/material';
import {
  Psychology,
  TrackChanges,
  Lightbulb,
  Chat,
  ArrowForward,
  Send,
  Schedule,
  People,
  CheckCircle,
  BusinessCenter
} from '@mui/icons-material';
import { IconWrapper, Badge, ProgressBar } from './StyledComponents';

const CompleteView = ({ onNewAnalysis }) => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 0.5, fontSize: '1.5rem', fontWeight: 700 }}>Discovery Call - TechCorp</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Schedule fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">April 30, 2025 • 32 minutes</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <People fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2">John Smith (Sales), Emily Chen (Prospect)</Typography>
            </Box>
          </Box>
        </Box>
        <Button size="small" onClick={onNewAnalysis}>New Analysis</Button>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Summary Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <IconWrapper color="info">
                    <Chat />
                  </IconWrapper>
                  <Typography variant="h4">Conversation Summary</Typography>
                </Box>
                
                <Typography sx={{ mb: 3, color: 'text.primary' }}>
                  Discovery call focused on TechCorp's data analytics challenges. Emily expressed 
                  frustration with their current system's scalability issues and is looking for a 
                  solution that can handle 500GB+ of daily data processing with better integration 
                  capabilities.
                </Typography>
                
                <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 500 }}>Key Points</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircle fontSize="small" sx={{ color: 'success.main', mt: 0.5 }} />
                    <Typography>Pain point: Current analytics system not scaling with growth</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircle fontSize="small" sx={{ color: 'success.main', mt: 0.5 }} />
                    <Typography>Decision criteria: Performance, integration, and cost</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircle fontSize="small" sx={{ color: 'success.main', mt: 0.5 }} />
                    <Typography>Timeline: Looking to implement within Q3</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircle fontSize="small" sx={{ color: 'success.main', mt: 0.5 }} />
                    <Typography>Budget: $50-75K allocated for the project</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            
            {/* Psychology and Strategy Cards */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <IconWrapper color="secondary">
                        <Psychology />
                      </IconWrapper>
                      <Typography variant="h4">Psychological Profile</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5, color: 'text.secondary' }}>Communication Style</Typography>
                        <Typography sx={{ color: 'text.primary' }}>Analytical</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5, color: 'text.secondary' }}>Pain Points</Typography>
                        <Typography sx={{ color: 'text.primary' }}>Technical limitations, Efficiency concerns</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5, color: 'text.secondary' }}>Decision Factors</Typography>
                        <Typography sx={{ color: 'text.primary' }}>ROI, Technical specifications, Support quality</Typography>
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ mb: 0.5, color: 'text.secondary' }}>Persuasion Triggers</Typography>
                        <Typography sx={{ color: 'text.primary' }}>Data-driven proof, Technical demonstrations</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                      <IconWrapper color="success">
                        <TrackChanges />
                      </IconWrapper>
                      <Typography variant="h4">Strategic Analysis</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Socratic Approach</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>85%</Typography>
                        </Box>
                        <ProgressBar value={85} color="success" />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Active Listening</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>92%</Typography>
                        </Box>
                        <ProgressBar value={92} color="success" />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Needs Discovery</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>78%</Typography>
                        </Box>
                        <ProgressBar value={78} color="info" />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Value Articulation</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>70%</Typography>
                        </Box>
                        <ProgressBar value={70} color="warning" />
                      </Box>
                      
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Objection Handling</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>83%</Typography>
                        </Box>
                        <ProgressBar value={83} color="info" />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* Key Moments Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                  <IconWrapper color="warning">
                    <Lightbulb />
                  </IconWrapper>
                  <Typography variant="h4">Key Conversation Moments</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2, borderBottom: '1px solid #f1f5f9' }}>
                    <Box sx={{ textAlign: 'center', minWidth: '5rem' }}>
                      <Badge sx={{ mb: 0.5 }}>08:42</Badge>
                      <Badge variant="error">Pain Point</Badge>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'text.primary' }}>Prospect mentioned scalability challenges with current system</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2, borderBottom: '1px solid #f1f5f9' }}>
                    <Box sx={{ textAlign: 'center', minWidth: '5rem' }}>
                      <Badge sx={{ mb: 0.5 }}>12:15</Badge>
                      <Badge variant="success">Buying Signal</Badge>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'text.primary' }}>Asked about implementation timeline and resource requirements</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, pb: 2, borderBottom: '1px solid #f1f5f9' }}>
                    <Box sx={{ textAlign: 'center', minWidth: '5rem' }}>
                      <Badge sx={{ mb: 0.5 }}>18:30</Badge>
                      <Badge variant="warning">Objection</Badge>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'text.primary' }}>Concern about integration with existing MarTech stack</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ textAlign: 'center', minWidth: '5rem' }}>
                      <Badge sx={{ mb: 0.5 }}>24:18</Badge>
                      <Badge variant="info">Agreement</Badge>
                    </Box>
                    <Box>
                      <Typography sx={{ color: 'text.primary' }}>Acknowledged value proposition of real-time analytics feature</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Next Steps Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <IconWrapper>
                    <ArrowForward />
                  </IconWrapper>
                  <Typography variant="h4">Next Steps</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '50%', 
                        bgcolor: '#ede9fe', 
                        color: 'primary.main', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.75rem', 
                        fontWeight: 500, 
                        flexShrink: 0 
                      }}
                    >
                      1
                    </Box>
                    <Typography sx={{ color: 'text.primary' }}>Send technical specifications document by May 2</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '50%', 
                        bgcolor: '#ede9fe', 
                        color: 'primary.main', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.75rem', 
                        fontWeight: 500, 
                        flexShrink: 0 
                      }}
                    >
                      2
                    </Box>
                    <Typography sx={{ color: 'text.primary' }}>Schedule technical demo with IT team for next week</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '50%', 
                        bgcolor: '#ede9fe', 
                        color: 'primary.main', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.75rem', 
                        fontWeight: 500, 
                        flexShrink: 0 
                      }}
                    >
                      3
                    </Box>
                    <Typography sx={{ color: 'text.primary' }}>Prepare customized ROI analysis based on their data volume</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box 
                      sx={{ 
                        width: '1.5rem', 
                        height: '1.5rem', 
                        borderRadius: '50%', 
                        bgcolor: '#ede9fe', 
                        color: 'primary.main', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '0.75rem', 
                        fontWeight: 500, 
                        flexShrink: 0 
                      }}
                    >
                      4
                    </Box>
                    <Typography sx={{ color: 'text.primary' }}>Follow up on budget approval process mentioned at 26:12</Typography>
                  </Box>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  startIcon={<BusinessCenter />}
                >
                  Add to CRM
                </Button>
              </CardContent>
            </Card>
            
            {/* Follow-up Actions Card */}
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <IconWrapper color="success">
                    <Send />
                  </IconWrapper>
                  <Typography variant="h4">Follow-up Actions</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          width: '1.25rem', 
                          height: '1.25rem', 
                          border: '2px solid #e2e8f0', 
                          borderRadius: '0.25rem', 
                          display: 'inline-block' 
                        }} 
                      />
                      <Typography variant="body2">Send follow-up email</Typography>
                    </Box>
                    <Button 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f8fafc', 
                        color: '#64748b', 
                        fontSize: '0.75rem', 
                        py: 0.5, 
                        px: 1 
                      }}
                    >
                      Template
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          width: '1.25rem', 
                          height: '1.25rem', 
                          border: '2px solid #e2e8f0', 
                          borderRadius: '0.25rem', 
                          display: 'inline-block' 
                        }} 
                      />
                      <Typography variant="body2">Schedule demo meeting</Typography>
                    </Box>
                    <Button 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f8fafc', 
                        color: '#64748b', 
                        fontSize: '0.75rem', 
                        py: 0.5, 
                        px: 1 
                      }}
                    >
                      Calendar
                    </Button>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box 
                        component="span" 
                        sx={{ 
                          width: '1.25rem', 
                          height: '1.25rem', 
                          border: '2px solid #e2e8f0', 
                          borderRadius: '0.25rem', 
                          display: 'inline-block' 
                        }} 
                      />
                      <Typography variant="body2">Create ROI analysis</Typography>
                    </Box>
                    <Button 
                      size="small" 
                      sx={{ 
                        bgcolor: '#f8fafc', 
                        color: '#64748b', 
                        fontSize: '0.75rem', 
                        py: 0.5, 
                        px: 1 
                      }}
                    >
                      Task
                    </Button>
                  </Box>
                </Box>
                
                <Button 
                  variant="outlined" 
                  fullWidth 
                  sx={{ mt: 3, borderColor: 'primary.main', color: 'primary.main' }}
                >
                  Export Analysis as PDF
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompleteView;
