library(shiny)
library(htmltools)
library(jsonlite)

# Global Options
options(shiny.maxRequestSize = 30 * 1024^2) # 30MB limit

# Mock Services (Placeholder)
source("R/services.R")
