#' Ingestion Module UI
#' @param id Module namespace ID
#' @param template_file HTML template file path
ingestionUI <- function(id, template_file) {
  ns <- NS(id)
  
  htmlTemplate(template_file,
               count_input = fileInput(ns("counts_file"), label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv")),
               meta_input = fileInput(ns("meta_file"), label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv"))
  )
}

#' Ingestion Module Server
#' @param id Module namespace ID
ingestionServer <- function(id) {
  moduleServer(id, function(input, output, session) {
    # Server logic for ingestion (e.g., handling file uploads)
    # can be added here.
    
    observeEvent(input$counts_file, {
      # Example: Use the singleton R6 service
      # storage_service$upload(input$counts_file$datapath, input$counts_file$name)
    })
  })
}
