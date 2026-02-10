library(R6)
library(RSQLite)
library(DBI)

DatabaseManager <- R6Class("DatabaseManager",
  public = list(
    db_path = NULL,
    conn = NULL,
    
    initialize = function(db_path = "blokbio.sqlite") {
      self$db_path <- db_path
      self$connect()
      self$init_schema()
    },
    
    connect = function() {
      self$conn <- dbConnect(RSQLite::SQLite(), self$db_path)
    },
    
    disconnect = function() {
      if (!is.null(self$conn)) {
        dbDisconnect(self$conn)
        self$conn <- NULL
      }
    },
    
    init_schema = function() {
      # Projects Table
      if (!dbExistsTable(self$conn, "projects")) {
        dbExecute(self$conn, "
          CREATE TABLE projects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            owner TEXT,
            status TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        ")
        # Seed initial data for demo
        self$seed_data()
      }
      
      # Samples Table
      if (!dbExistsTable(self$conn, "samples")) {
        dbExecute(self$conn, "
          CREATE TABLE samples (
            id TEXT PRIMARY KEY,
            project_id TEXT,
            name TEXT,
            file_path TEXT,
            FOREIGN KEY(project_id) REFERENCES projects(id)
          )
        ")
      }
    },
    
    seed_data = function() {
      projects <- data.frame(
        id = c("DLT-8921", "DLT-8924"),
        name = c("Mouse_Liver_Study_001", "Human_CellLine_Treat"),
        owner = c("Dr. S. Chen", "J. Doe"),
        status = c("QC Passed", "Processing"),
        stringsAsFactors = FALSE
      )
      dbWriteTable(self$conn, "projects", projects, append = TRUE, row.names = FALSE)
    },
    
    query = function(sql, params = list()) {
      if (length(params) == 0) {
        dbGetQuery(self$conn, sql)
      } else {
        dbGetQuery(self$conn, sql, params = params)
      }
    },
    
    execute = function(sql, params = list()) {
      if (length(params) == 0) {
        dbExecute(self$conn, sql)
      } else {
        dbExecute(self$conn, sql, params = params)
      }
    }
  )
)
