# Install missing dependencies
pkgs <- c("RSQLite", "DBI")
for (pkg in pkgs) {
  if (!requireNamespace(pkg, quietly = TRUE)) {
    message(paste("Installing", pkg, "..."))
    install.packages(pkg, repos = "https://cloud.r-project.org")
  }
}
message("Dependencies installed.")
