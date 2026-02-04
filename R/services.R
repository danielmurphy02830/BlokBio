# Services Interface
# Ideally R6 classes, but for simple mock demo, functions are fine.

# Storage Service
StorageService <- list(
  upload = function(file_path, key) {
    # Mock upload: Copy file to a local "bucket" folder
    bucket_dir <- "local_bucket"
    if (!dir.exists(bucket_dir)) dir.create(bucket_dir)
    file.copy(file_path, file.path(bucket_dir, key), overwrite = TRUE)
    return(TRUE)
  },
  
  list_projects = function() {
    # Mock list
    return(data.frame(
      ProjectName = c("Mouse_Liver_Study_001", "Human_CellLine_Treat"),
      ID = c("DLT-8921", "DLT-8924"),
      Status = c("QC Passed", "Processing"),
      stringsAsFactors = FALSE
    ))
  }
)

# Compute Service
ComputeService <- list(
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
