# Verification Script for Database
source("R/services.R")

tryCatch({
  message("Connecting to DB...")
  # This should initialize the new DB manager and seed data
  projects <- storage_service$list_projects()
  
  if (nrow(projects) > 0) {
    message("PASS: Projects retrieved from DB.")
    print(projects)
  } else {
    stop("FAIL: No projects returned (seeding failed?)")
  }
  
  # Test Create Project
  new_id <- storage_service$create_project("Test_Project_DB", "Tester")
  message(paste("PASS: Created project with ID:", new_id))
  
  # Verify insertion
  projects_new <- storage_service$list_projects()
  if (nrow(projects_new) == nrow(projects) + 1) {
    message("PASS: Project count incremented.")
  } else {
    stop("FAIL: Project count did not increase.")
  }
  
  message("\nDatabase verification successful.")
  
}, error = function(e) {
  message("ERROR: ", e$message)
})
