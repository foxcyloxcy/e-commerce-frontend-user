import React from "react";

import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import BenefitsSection from "./sections/BenefitsSection";
import JoinSection from "./sections/JoinSection";
import ModTheme from "../ThemeComponent/ModTheme";
import { ThemeProvider } from "@mui/material";


export default function NewHomepage() {
  return (
    <ThemeProvider theme={ModTheme}>
      <HeroSection />
      {/* <AboutSection /> */}
      {/* <BenefitsSection /> */}
      {/* <JoinSection /> */}
    </ThemeProvider>
  );
}