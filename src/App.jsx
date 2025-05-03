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
      
      // Create a conversation record in Supabase
      const { data: conversationData, error: conversationError } = await api.createConversation({
        file_name: selectedFile.name,
        file_url: data?.publicUrl || '',
        file_path: filePath,
        file_size: selectedFile.size,
        duration_seconds: null, // Will be updated after analysis
        title: `Analysis - ${selectedFile.name}`,
        meeting_type: 'discovery',
        approach: 'socratic',
        meeting_date: new Date().toISOString(),
        status: 'analyzing'
      });
      
      if (conversationError) {
        console.error('Error creating conversation record:', conversationError);
        // Continue anyway, as this is not critical for the demo
      }
      
      const conversationId = conversationData?.[0]?.id;
      
      // Call the backend API with the file URL
      const result = await api.sendRequest({
        action: 'analyze',
        data: {
          meetingType: 'discovery',
          approach: 'socratic',
          fileUrl: data?.publicUrl || '',
          conversationId: conversationId
        }
      });
      
      // Log activity to Supabase
      await api.logActivity({
        action: 'analyze',
        result: 'success',
        conversation_id: conversationId,
        timestamp: new Date().toISOString()
      });
      
      // Store mock behavioral analysis data for demo purposes
      if (conversationId) {
        // Update conversation status to completed
        await api.updateConversationStatus(conversationId, 'completed');
        
        // Store mock participants
        await api.storeParticipant({
          conversation_id: conversationId,
          name: 'John Smith',
          role: 'sales_rep',
          speaking_time_seconds: 720,
          speaking_percentage: 45,
          interruption_count: 3,
          question_count: 12
        });
        
        await api.storeParticipant({
          conversation_id: conversationId,
          name: 'Emily Chen',
          role: 'prospect',
          company: 'TechCorp',
          position: 'CTO',
          speaking_time_seconds: 880,
          speaking_percentage: 55,
          interruption_count: 1,
          question_count: 5
        });
        
        // Store mock behavioral analysis
        await api.storeBehavioralAnalysis({
          conversation_id: conversationId,
          conversation_summary: "Discovery call focused on TechCorp's data analytics challenges. Emily expressed frustration with their current system's scalability issues and is looking for a solution that can handle 500GB+ of daily data processing with better integration capabilities.",
          key_points: [
            "Pain point: Current analytics system not scaling with growth",
            "Decision criteria: Performance, integration, and cost",
            "Timeline: Looking to implement within Q3",
            "Budget: $50-75K allocated for the project"
          ],
          behavioral_indicators: {
            deception_analysis: {
              deception_indicators: [
                {
                  timestamp: 142,
                  speaker: "prospect",
                  indicator: "inconsistency_in_statement",
                  description: "Contradicted earlier statement about budget approval process",
                  confidence: 78
                }
              ],
              overall_deception_likelihood: 35,
              topics_with_deception: ["budget", "timeline"]
            },
            stress_indicators: {
              high_stress_moments: [
                {
                  timestamp: 320,
                  speaker: "prospect",
                  trigger: "pricing_discussion",
                  indicators: ["voice_pitch_increase", "speech_rate_increase", "filler_words"],
                  intensity: 72
                }
              ],
              baseline_stress_level: 25,
              stress_progression: [20, 25, 45, 72, 40, 30]
            },
            power_dynamics: {
              dominant_speaker: "sales_rep",
              power_shifts: [
                {
                  timestamp: 410,
                  from: "sales_rep",
                  to: "prospect",
                  trigger: "technical_question"
                }
              ],
              control_percentage: {
                "sales_rep": 65,
                "prospect": 35
              }
            }
          },
          psychological_profiles: {
            sales_rep: {
              communication_style: "assertive",
              listening_patterns: "selective",
              persuasion_approach: "logical",
              strengths: ["technical_knowledge", "confidence"],
              areas_for_improvement: ["active_listening", "empathy"]
            },
            prospect: {
              communication_style: "analytical",
              decision_making_style: "methodical",
              objection_patterns: "price_focused",
              influence_factors: ["data", "peer_recommendations", "risk_reduction"],
              pain_points: ["efficiency", "integration", "reporting"]
            }
          },
          strategic_advice: {
            harvey_specter_advice: "You let them control the conversation when they mentioned budget constraints. Next time, hit them with 'I don't discuss price until I know if we're the right fit. Let's focus on whether our solution solves your $2M scalability problem first.' Assert your value before discussing numbers.",
            power_move_opportunities: [
              {
                timestamp: 310,
                context: "When prospect mentioned committee decision",
                recommended_response: "Committees don't make decisions, people do. Who's the real decision-maker here?"
              }
            ],
            missed_closing_opportunities: [
              {
                timestamp: 480,
                buying_signal: "Asked about implementation timeline",
                recommended_close: "It sounds like you're ready to move forward. We can have you up and running in 3 weeks if we start the paperwork today. Shall I send over the agreement?"
              }
            ]
          },
          socratic_questions: [
            {
              question: "You mentioned scalability issues three times. How much is this costing your team in terms of time and resources?",
              purpose: "pain_exploration",
              timing: "follow_up",
              expected_impact: "Quantify pain point"
            },
            {
              question: "If you could solve the integration challenges we discussed, what would that mean for your quarterly targets?",
              purpose: "value_articulation",
              timing: "next_call",
              expected_impact: "Connect solution to business outcomes"
            },
            {
              question: "Between the performance issues and the budget constraints you mentioned, which one keeps you up at night?",
              purpose: "priority_identification",
              timing: "immediate",
              expected_impact: "Identify primary driver"
            }
          ],
          key_moments: [
            {
              timestamp: 245,
              type: "buying_signal",
              description: "Asked about implementation timeline",
              importance: 4,
              speaker: "prospect",
              behavioral_context: {
                confidence_level: 72,
                stress_level: 30,
                deception_likelihood: 15
              }
            },
            {
              timestamp: 520,
              type: "objection",
              description: "Concern about integration with existing MarTech stack",
              importance: 3,
              speaker: "prospect",
              behavioral_context: {
                confidence_level: 65,
                stress_level: 45,
                deception_likelihood: 20
              }
            }
          ],
          next_steps: [
            "Send technical specifications document by May 2",
            "Schedule technical demo with IT team for next week",
            "Prepare customized ROI analysis based on their data volume",
            "Follow up on budget approval process mentioned at 26:12"
          ]
        });
      }
      
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
