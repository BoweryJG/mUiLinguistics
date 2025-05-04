import React from 'react';
import { Box, Typography, LinearProgress, Button, Paper, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2]
}));

const UsageBar = styled(LinearProgress)(({ theme, value }) => ({
  height: 10,
  borderRadius: 5,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    backgroundColor: value > 90 ? theme.palette.error.main : 
                   value > 70 ? theme.palette.warning.main : 
                   theme.palette.primary.main
  }
}));

const TierChip = styled(Chip)(({ theme, tier }) => ({
  backgroundColor: 
    tier === 'pro' ? theme.palette.success.main : 
    tier === 'basic' ? theme.palette.info.main : 
    theme.palette.grey[400],
  color: theme.palette.common.white,
  fontWeight: 'bold',
  marginLeft: theme.spacing(1)
}));

const SubscriptionInfo = () => {
  const { subscription, usageData, fetchUsageData } = useAuth();

  if (!subscription) {
    return null;
  }

  const { tier, quota, usage, resetDate } = subscription;
  const usagePercentage = Math.min(Math.round((usage / quota) * 100), 100);
  
  // Format reset date
  const formattedResetDate = resetDate ? 
    new Date(resetDate).toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) : 'N/A';

  // Handle upgrade click
  const handleUpgradeClick = () => {
    // Redirect to LemonSqueezy checkout
    const checkoutUrl = tier === 'free' 
      ? 'https://yourstore.lemonsqueezy.com/checkout/buy/basic-plan-id'
      : 'https://yourstore.lemonsqueezy.com/checkout/buy/pro-plan-id';
    
    window.open(checkoutUrl, '_blank');
  };

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Subscription
          <TierChip 
            label={tier.toUpperCase()} 
            tier={tier} 
            size="small" 
          />
        </Typography>
        {tier !== 'pro' && (
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            onClick={handleUpgradeClick}
          >
            Upgrade
          </Button>
        )}
      </Box>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Usage this month
      </Typography>
      
      <UsageBar 
        variant="determinate" 
        value={usagePercentage}
      />
      
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">
          {usage} / {quota} analyses
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {usagePercentage}%
        </Typography>
      </Box>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Next reset:
          </Typography>
          <Typography variant="body1">
            {formattedResetDate}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="textSecondary">
            Max file size:
          </Typography>
          <Typography variant="body1">
            {tier === 'free' ? '25 MB' : tier === 'basic' ? '50 MB' : '100 MB'}
          </Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default SubscriptionInfo;
