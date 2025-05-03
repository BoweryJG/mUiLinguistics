import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Paper
} from '@mui/material';
import { ProgressBar } from './StyledComponents';

const InsightsView = () => {
  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Team Performance" />
        <CardContent>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2.5 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Conversations Analyzed</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>248</Typography>
                <Typography variant="h6" sx={{ color: 'success.main', mt: 0.5 }}>+12% from last month</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2.5 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Avg. Strategy Score</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>76.8%</Typography>
                <Typography variant="h6" sx={{ color: 'success.main', mt: 0.5 }}>+3.2% from last month</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2.5 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Top Performer</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Sarah J.</Typography>
                <Typography variant="h6" sx={{ color: 'info.main', mt: 0.5 }}>94.2% strategy score</Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2.5 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>Growth Opportunity</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>Value Articulation</Typography>
                <Typography variant="h6" sx={{ color: 'warning.main', mt: 0.5 }}>Team avg: 68.3%</Typography>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ borderTop: '1px solid #e2e8f0', pt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 500 }}>Strategy Execution by Rep</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>Sarah Johnson</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={94.2} color="success" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>94.2%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'success.main' }}>+2.1%</Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>Michael Taylor</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={87.5} color="success" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>87.5%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'success.main' }}>+4.3%</Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>David Rodriguez</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={82.1} color="success" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>82.1%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'success.main' }}>+1.8%</Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>Emily Chen</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={79.8} color="info" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>79.8%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'error.main' }}>-0.7%</Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>Alex Washington</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={72.4} color="info" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>72.4%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'success.main' }}>+5.2%</Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '9rem', fontSize: '0.875rem' }}>Jessica Lee</Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                  <ProgressBar value={68.9} color="warning" />
                </Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500 }}>68.9%</Box>
                <Box sx={{ width: '4rem', textAlign: 'right', fontSize: '0.75rem', color: 'success.main' }}>+2.4%</Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Skill Development Opportunities" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Value Articulation</Typography>
                    <Typography variant="body2">68.3%</Typography>
                  </Box>
                  <ProgressBar value={68.3} color="warning" />
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Team struggles with clearly connecting product features to specific customer pain points.
                  </Typography>
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Technical Depth</Typography>
                    <Typography variant="body2">72.1%</Typography>
                  </Box>
                  <ProgressBar value={72.1} color="info" />
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    More technical training needed to address complex customer questions confidently.
                  </Typography>
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Objection Handling</Typography>
                    <Typography variant="body2">75.8%</Typography>
                  </Box>
                  <ProgressBar value={75.8} color="info" />
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Team needs more practice with competitive differentiation objections.
                  </Typography>
                </Box>
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>Discovery Questions</Typography>
                    <Typography variant="body2">81.4%</Typography>
                  </Box>
                  <ProgressBar value={81.4} color="success" />
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    Strong overall, but could improve on uncovering budget constraints earlier.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Conversation Metrics" />
            <CardContent>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>Avg. Talk Ratio</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>42%</Typography>
                      <Typography variant="body2" sx={{ color: 'success.main' }}>(-5%)</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      Rep speaking time
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ bgcolor: '#f8fafc', p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>Avg. Call Length</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>28m</Typography>
                      <Typography variant="body2" sx={{ color: 'success.main' }}>(-2m)</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      More efficient demos
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ mb: 1.5 }}>Most Effective Questions</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                      "What metrics are you currently using to measure success?"
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      93% engagement rate, leads to detailed pain point discussions
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                      "How would solving this problem impact your team's productivity?"
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      87% engagement rate, helps quantify ROI
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
                      "Who else in your organization would benefit from this solution?"
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      82% engagement rate, expands deal scope
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InsightsView;
