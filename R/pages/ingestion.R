#' Render Ingestion Page
render_ingestion_page <- function(template_file) {
  htmlTemplate(template_file,
               count_input = fileInput("counts_file", label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv")),
               meta_input = fileInput("meta_file", label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv"))
  )
}
