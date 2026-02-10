source("global.R")

# Source Page Modules
sapply(list.files("R/pages", full.names = TRUE), source)

ui <- tagList(
  uiOutput("page_view")
)

server <- function(input, output, session) {
  
  # -- Router --
  # Current page state. 
  # Options: "home", "ingestion", "qc", "dgea", "pathway", "report"
  page <- reactiveVal("home")
  
  # -- Router Helper --
  observe({
    query <- parseQueryString(session$clientData$url_search)
    if (!is.null(query$page)) page(query$page)
  })
  
  observeEvent(input$nav_page, page(input$nav_page))

  output$page_view <- renderUI({
    current <- page()
    
    # Map pages to template files
    template_file <- switch(current,
      "home" = "templates/home.html",
      "ingestion" = "templates/ingestion.html",
      "qc" = "templates/qc.html",
      "dgea" = "templates/dgea.html",
      "pathway" = "templates/pathway.html",
      "report" = "templates/report.html",
      # New Pages
      "contrast" = "templates/contrast.html",
      "workspaces" = "templates/workspaces.html",
      "connector" = "templates/connector.html",
      "dev_analytics" = "templates/dev_analytics.html",
      "dev_api" = "templates/dev_api.html",
      "dev_portal" = "templates/dev_portal.html",
      "dev_sandbox" = "templates/dev_sandbox.html",
      "dev_support" = "templates/dev_support.html",
      "dev_webhooks" = "templates/dev_webhooks.html",
      "geneai" = "templates/geneai.html",
      "workflows_installed" = "templates/workflows_installed.html",
      "metadata_wizard" = "templates/metadata_wizard.html",
      "plugin_details" = "templates/plugin_details.html",
      "governance" = "templates/governance.html",
      "marketplace" = "templates/marketplace.html",
      "templates/home.html" # Default
    )
    
    # Render using Modules
    if (current == "ingestion") {
       ingestionUI("ingestion", template_file)
    } else if (current == "qc") {
       qcUI("qc", template_file)
    } else if (current == "dgea") {
       dgeaUI("dgea", template_file)
    } else if (current == "pathway") {
       pathwayUI("pathway", template_file)
    } else if (current == "workspaces") {
       workspacesUI("workspaces", template_file)
    } else if (current == "contrast") {
       contrastUI("contrast", template_file)
    } else {
       htmlTemplate(template_file) # Default/Static pages
    }
  })
  
  # -- Server Logic Setup --
  # Initialize Module Servers
  ingestionServer("ingestion")
  qcServer("qc")
  dgeaServer("dgea")
  pathwayServer("pathway")
  
  # For pages that need the template in the server (dynamic table injection)
  # We assume standard locations.
  workspacesServer("workspaces", "templates/workspaces.html")
  contrastServer("contrast", "templates/contrast.html")

}

shinyApp(ui, server)
