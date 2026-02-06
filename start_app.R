# start_app.R
# Helper script to launch BlokBio

# 1. Function to check and install packages
ensure_package <- function(pkg) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    message(paste("Installing missing package:", pkg))
    install.packages(pkg, repos = "https://cloud.r-project.org")
  }
}

# 2. Check required dependencies
requirements <- c("shiny", "htmltools", "jsonlite")
lapply(requirements, ensure_package)

# 3. Launch App
message("Starting BlokBio...")
# Use port 3838 or let Shiny pick one. Launch browser automatically.
shiny::runApp(".", launch.browser = TRUE, port = 3838)
