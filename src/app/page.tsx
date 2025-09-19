'use client';

import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import RouteIcon from '@mui/icons-material/Route';
import { Box, Button, Container, Typography, Stack, Paper, Grid, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const goDemo = () => router.push('/demo');
  const goActionFlow = () => router.push('/action-flow');
  const goPlayground = () => router.push('/playground'); // students write code here

  // Keyboard shortcuts: D (demo), A (action flow), S (student playground)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const k = e.key.toLowerCase();
      if (k === 'd') goDemo();
      if (k === 'a') goActionFlow();
      if (k === 's') goPlayground();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Stack spacing={2} alignItems="center">
            <Chip
              label="Unified Growth & AI Microservices"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                fontSize: { xs: '2.25rem', md: '3.25rem' },
                color: 'text.primary',
              }}
            >
              Welcome to DokaAI
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 820, lineHeight: 1.6 }}>
              Build and explore AI-driven supporting microservices—Notifications, Engagement,
              Rewards, Search, and Agents— with production-grade patterns (multi-tenant, DDD, CQRS).
            </Typography>

            <p>You need to setup the action flow in the route provided below</p>
            <p>
              Demo will give and example for you how to use the components and create one for you
            </p>
          </Stack>
        </Box>

        {/* Actions */}
        <Grid container spacing={3} justifyContent="center">
          {/* Demo */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
              }}
            >
              <Stack spacing={2} alignItems="flex-start">
                <CodeIcon sx={{ fontSize: 36, color: 'text-text-primary' }} />
                <Typography
                  variant="h5"
                  className="text-text-primary"
                  component="h2"
                  sx={{ fontWeight: 700 }}
                >
                  Component Demo
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                  You can see the demo code under demo folder which uses custom select cute ui
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={goDemo}
                  startIcon={<RocketLaunchIcon />}
                  fullWidth
                  aria-label="Open Demo"
                >
                  Launch Demo (D)
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Action Flow */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
              }}
            >
              <Stack spacing={2} alignItems="flex-start">
                <RouteIcon sx={{ fontSize: 36, color: 'primary.main' }} />
                <Typography
                  className="text-text-primary"
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 700 }}
                >
                  Action Flow
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 64 }}>
                  Walk through the end-to-end path: configure → trigger → process → send → observe →
                  iterate.
                </Typography>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={goActionFlow}
                  fullWidth
                  aria-label="View Action Flow"
                >
                  View Action Flow (A)
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Helper Row */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Shortcuts: Press <b>D</b> for Demo, <b>A</b> for Action Flow
          </Typography>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Need help? Reach out to <b>Atul Joshi</b> — WhatsApp: <b>961120557</b> · Email:{' '}
            <b>atuljoshi@nthexam.com</b>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
