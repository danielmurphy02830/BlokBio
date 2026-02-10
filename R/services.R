library(R6)
source("R/db.R")

# Initialize Database
db_manager <- DatabaseManager$new()

# Storage Service
StorageService <- R6Class("StorageService",
  public = list(
    bucket_dir = "local_bucket",
    db = NULL,
    
    initialize = function(db_manager) {
      if (!dir.exists(self$bucket_dir)) dir.create(self$bucket_dir)
      self$db <- db_manager
    },
    
    upload = function(file_path, key, project_id) {
      # 1. Physical file copy
      dest_path <- file.path(self$bucket_dir, key)
      file.copy(file_path, dest_path, overwrite = TRUE)
      
      # 2. Register in DB
      # Generate a mock ID for the sample if not provided
      sample_id <- paste0("SMP-", as.integer(Sys.time()))
      
      tryCatch({
        self$db$execute(
          "INSERT INTO samples (id, project_id, name, file_path) VALUES (?, ?, ?, ?)",
          params = list(sample_id, project_id, key, dest_path)
        )
      }, error = function(e) {
        warning("Failed to register sample in DB: ", e$message)
      })
      
      return(TRUE)
    },
    
    list_projects = function() {
      return(self$db$query("SELECT id as ID, name as ProjectName, owner as Owner, status as Status FROM projects"))
    },
    
    create_project = function(name, owner) {
      id <- paste0("DLT-", floor(runif(1, 1000, 9999)))
      self$db$execute(
        "INSERT INTO projects (id, name, owner, status) VALUES (?, ?, ?, ?)",
        params = list(id, name, owner, "Pending")
      )
      return(id)
    }
  )
)

# Compute Service (Unchanged for now, but could read job status from DB)
ComputeService <- R6Class("ComputeService",
  public = list(
    trigger_dgea = function(project_id, design) {
      # Mock trigger
      Sys.sleep(1) # Simulate network
      return("JOB-12345")
    },
    
    get_status = function(job_id) {
      # Mock status
      return("COMPLETED")
    }
  )
)

# Instantiate Global Services
storage_service <- StorageService$new(db_manager)
compute_service <- ComputeService$new()
