import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Paper
} from '@mui/material';
import {
  Psychology,
  TrackChanges,
  ArrowForward,
  Analytics,
  Groups,
  Group,
  Gavel,
  Bolt,
  ThumbDown,
  TrendingUp,
  Science,
  Loop,
  Hearing,
  FileUpload
} from '@mui/icons-material';
import { ScoreBadge, IconWrapper, Badge, ProgressBar } from './StyledComponents';

const DashboardView = ({ onUploadClick }) => {
  // State to track which sections are expanded
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Function to toggle section expansion
  const toggleSection = (sectionName) => {
    if (expandedSection === sectionName) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionName);
    }
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader
            title="Recent Analyses"
            action={
              <Button variant="contained" color="primary" size="small">
                View All
              </Button>
            }
          />
          <CardContent>
            <Box sx={{ '& > :not(:last-child)': { mb: 2 } }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f8fafc' }
                }}
              >
                <ScoreBadge score={87} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h4" sx={{ m: 0 }}>Discovery Call - TechCorp</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>Today at 10:45 AM</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>4 insights</Typography>
                  <ArrowForward fontSize="small" sx={{ color: '#cbd5e1' }} />
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f8fafc' }
                }}
              >
                <ScoreBadge score={92} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h4" sx={{ m: 0 }}>Demo - Acme Industries</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>Yesterday at 2:15 PM</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>6 insights</Typography>
                  <ArrowForward fontSize="small" sx={{ color: '#cbd5e1' }} />
                </Box>
              </Paper>
              
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: '#f8fafc' }
                }}
              >
                <ScoreBadge score={76} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography variant="h4" sx={{ m: 0 }}>Follow-up - Global Financial</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>Apr 28, 11:30 AM</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>3 insights</Typography>
                  <ArrowForward fontSize="small" sx={{ color: '#cbd5e1' }} />
                </Box>
              </Paper>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader title="Quick Upload" />
          <CardContent>
            <Box 
              onClick={onUploadClick}
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
                <FileUpload fontSize="large" />
              </Box>
              <Typography variant="h3" sx={{ mb: 0.5 }}>Upload conversation</Typography>
              <Typography variant="body2" sx={{ mb: 3 }}>
                Drop your audio file here or click to browse
              </Typography>
              <Button variant="contained" color="primary">Select File</Button>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>Performance Metrics</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Strategy Score</Typography>
                      <Badge variant="success">+12%</Badge>
                    </Box>
                    <Typography variant="h3">84.2</Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">Calls Analyzed</Typography>
                      <Badge variant="info">This Week</Badge>
                    </Box>
                    <Typography variant="h3">12</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Strategic Insights" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper 
                  onClick={() => toggleSection('psychology')}
                  sx={{ 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : '#f8fafc', 
                    borderRadius: 2, 
                    p: 2.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'visible',
                    height: expandedSection === 'psychology' ? 'auto' : undefined,
                    minHeight: expandedSection === 'psychology' ? '400px' : undefined,
                    boxShadow: expandedSection === 'psychology' ? 
                      (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(138, 43, 226, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)' 
                      : 'none',
                    border: (theme) => expandedSection === 'psychology' ? 
                      `1px solid ${theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light}` 
                      : '1px solid #e2e8f0',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(138, 43, 226, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
                      borderColor: (theme) => theme.palette.primary.main
                    },
                    zIndex: expandedSection === 'psychology' ? 10 : 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <IconWrapper color="secondary">
                      <Psychology />
                    </IconWrapper>
                    <Typography variant="h4">Psychology Patterns</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>Most common prospect profiles</Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        <Analytics sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#9333ea' }} />
                        Analytical
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>42%</Typography>
                    </Box>
                    <ProgressBar value={42} color="secondary" />
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        <Groups sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#9333ea' }} />
                        Collaborative
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>28%</Typography>
                    </Box>
                    <ProgressBar value={28} color="secondary" />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2">
                        <Gavel sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#9333ea' }} />
                        Decisive
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>18%</Typography>
                    </Box>
                    <ProgressBar value={18} color="secondary" />
                  </Box>
                  
                  {/* Expanded content */}
                  {expandedSection === 'psychology' && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px dashed #cbd5e1' }}>
                      <Typography variant="h4" sx={{ mb: 2 }}>Detailed Psychology Analysis</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Analytical Prospects (42%)</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Focus on data and logical arguments
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Respond well to detailed ROI calculations
                        </Typography>
                        <Typography variant="body2">
                          • Prefer comprehensive documentation
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Collaborative Prospects (28%)</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Value team consensus and input
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Respond to inclusive language
                        </Typography>
                        <Typography variant="body2">
                          • Appreciate discussion of implementation process
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Decisive Prospects (18%)</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Quick to make judgments
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Prefer direct, concise communication
                        </Typography>
                        <Typography variant="body2">
                          • Respond to clear action items
                        </Typography>
                      </Box>
                      
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small" 
                        sx={{ mt: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('/psychology-report', '_blank');
                        }}
                      >
                        View Full Psychology Report
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper 
                  onClick={() => toggleSection('persuasion')}
                  sx={{ 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : '#f8fafc', 
                    borderRadius: 2, 
                    p: 2.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'visible',
                    height: expandedSection === 'persuasion' ? 'auto' : undefined,
                    minHeight: expandedSection === 'persuasion' ? '400px' : undefined,
                    boxShadow: expandedSection === 'persuasion' ? 
                      (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(0, 255, 255, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)' 
                      : 'none',
                    border: (theme) => expandedSection === 'persuasion' ? 
                      `1px solid ${theme.palette.mode === 'dark' ? theme.palette.info.main : theme.palette.info.light}` 
                      : '1px solid #e2e8f0',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(0, 255, 255, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
                      borderColor: (theme) => theme.palette.info.main
                    },
                    zIndex: expandedSection === 'persuasion' ? 10 : 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <IconWrapper color="info">
                      <Bolt />
                    </IconWrapper>
                    <Typography variant="h4">Top Persuasion Triggers</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>Most effective techniques</Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', width: '2rem', height: '2rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>1</Box>
                    <Typography variant="body2">
                      <Group sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#1d4ed8' }} />
                      Social proof examples
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', width: '2rem', height: '2rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>2</Box>
                    <Typography variant="body2">
                      <TrendingUp sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#1d4ed8' }} />
                      ROI-focused discussion
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ bgcolor: '#dbeafe', color: '#1d4ed8', width: '2rem', height: '2rem', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>3</Box>
                    <Typography variant="body2">
                      <Science sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#1d4ed8' }} />
                      Technical demonstrations
                    </Typography>
                  </Box>
                  
                  {/* Expanded content */}
                  {expandedSection === 'persuasion' && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px dashed #cbd5e1' }}>
                      <Typography variant="h4" sx={{ mb: 2 }}>Persuasion Effectiveness</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Social Proof Examples</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • 87% success rate with enterprise clients
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Most effective when citing similar companies
                        </Typography>
                        <Typography variant="body2">
                          • Increases close rate by 34% when used early
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>ROI-Focused Discussion</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Particularly effective with financial decision makers
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Concrete examples outperform theoretical benefits
                        </Typography>
                        <Typography variant="body2">
                          • Most impactful when customized to prospect's industry
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Technical Demonstrations</Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Most effective with technical stakeholders
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Interactive demos have 2.5x engagement
                        </Typography>
                        <Typography variant="body2">
                          • Should be tailored to specific use cases
                        </Typography>
                      </Box>
                      
                      <Button 
                        variant="outlined" 
                        color="info" 
                        size="small" 
                        sx={{ mt: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('/persuasion-analysis', '_blank');
                        }}
                      >
                        View Detailed Persuasion Analysis
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper 
                  onClick={() => toggleSection('strategic')}
                  sx={{ 
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'background.paper' : '#f8fafc', 
                    borderRadius: 2, 
                    p: 2.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    position: 'relative',
                    overflow: 'visible',
                    height: expandedSection === 'strategic' ? 'auto' : undefined,
                    minHeight: expandedSection === 'strategic' ? '400px' : undefined,
                    boxShadow: expandedSection === 'strategic' ? 
                      (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(0, 250, 154, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)' 
                      : 'none',
                    border: (theme) => expandedSection === 'strategic' ? 
                      `1px solid ${theme.palette.mode === 'dark' ? theme.palette.success.main : theme.palette.success.light}` 
                      : '1px solid #e2e8f0',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 15px rgba(0, 250, 154, 0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
                      borderColor: (theme) => theme.palette.success.main
                    },
                    zIndex: expandedSection === 'strategic' ? 10 : 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <IconWrapper color="success">
                      <TrackChanges />
                    </IconWrapper>
                    <Typography variant="h4">Strategic Improvement</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>Focus areas for team development</Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">
                      <ThumbDown sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#b45309' }} />
                      Value articulation
                    </Typography>
                    <Badge variant="warning">Needs focus</Badge>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">
                      <Loop sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#1d4ed8' }} />
                      Objection handling
                    </Typography>
                    <Badge variant="info">Improving</Badge>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">
                      <Hearing sx={{ fontSize: '1rem', verticalAlign: 'middle', mr: 0.5, color: '#15803d' }} />
                      Active listening
                    </Typography>
                    <Badge variant="success">Strong</Badge>
                  </Box>
                  
                  {/* Expanded content */}
                  {expandedSection === 'strategic' && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px dashed #cbd5e1' }}>
                      <Typography variant="h4" sx={{ mb: 2 }}>Improvement Opportunities</Typography>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.warning.main }}>
                          Value Articulation (Needs Focus)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Only 32% of calls effectively communicate unique value
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Reps struggle to tailor value to specific industries
                        </Typography>
                        <Typography variant="body2">
                          • Recommended training: Value Proposition Workshop
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.info.main }}>
                          Objection Handling (Improving)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • 58% improvement in addressing pricing concerns
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Still struggling with competitive differentiation
                        </Typography>
                        <Typography variant="body2">
                          • Continue role-playing exercises in team meetings
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: (theme) => theme.palette.success.main }}>
                          Active Listening (Strong)
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • 87% of reps demonstrate excellent listening skills
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          • Effective use of clarifying questions
                        </Typography>
                        <Typography variant="body2">
                          • Consider having top performers mentor new hires
                        </Typography>
                      </Box>
                      
                      <Button 
                        variant="outlined" 
                        color="success" 
                        size="small" 
                        sx={{ mt: 3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('/improvement-plan', '_blank');
                        }}
                      >
                        View Complete Improvement Plan
                      </Button>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardView;
