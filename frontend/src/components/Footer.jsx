import React from 'react';
import { Box, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import blogLogoGif from '../utils/Logo.gif';

const Footer = ({ categories, portfolio, gmail, linkedin, github }) => {
  return (
    <Box component="footer" sx={{ py: 3, px: 30, mt: 'auto', backgroundColor: 'background.paper' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <RouterLink to={"/"}>
            <img src={blogLogoGif} alt="Blog Logo" style={{ width: '160px', marginBottom: '10px' }} />
          </RouterLink>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} style={{ width: '160px', marginBottom: '10px' }}>
            <Grid item component="a" href="https://portfolio.com" rel="noopener noreferrer" target="_blank">
              <img alt="portfolio logo" src={portfolio} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            </Grid>
            <Grid item component="a" href="https://www.gmail.com" rel="noopener noreferrer" target="_blank">
              <img alt="gmail logo" src={gmail} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            </Grid>
            <Grid item component="a" href="https://www.linkedin.com" rel="noopener noreferrer" target="_blank">
              <img alt="linkedin logo" src={linkedin} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            </Grid>
            <Grid item component="a" href="https://www.github.com" rel="noopener noreferrer" target="_blank">
              <img alt="github logo" src={github} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          {categories.slice(0, 3).map((section) => (
            <RouterLink
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '8px' }}
              key={section.name}
              to={`/category?category=${section.urlName}`}
            >
              {section.name}
            </RouterLink>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          {categories.slice(3, 6).map((section) => (
            <RouterLink
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '8px' }}
              key={section.name}
              to={`/category?category=${section.urlName}`}
            >
              {section.name}
            </RouterLink>
          ))}
        </Grid>
        <Grid item xs={12} md={3}>
          {categories.slice(6, 9).map((section) => (
            <RouterLink
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '8px' }}
              key={section.name}
              to={`/category?category=${section.urlName}`}
            >
              {section.name}
            </RouterLink>
          ))}
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} <span style={{ color: '#009975' }}>Anass Essadikine Blog</span>. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
