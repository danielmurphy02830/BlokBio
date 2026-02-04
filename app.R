source("global.R")

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
    
    # Render with template variables
    if (current == "ingestion") {
       htmlTemplate(template_file,
         count_input = fileInput("counts_file", label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv")),
         meta_input = fileInput("meta_file", label = NULL, width = "100%", accept = c("text/csv", "text/comma-separated-values", ".csv"))
       )
    } else if (current == "qc") {
       htmlTemplate(template_file,
         plot_pca = plotOutput("pca_plot", height = "100%"),
         plot_heatmap = plotOutput("heatmap_plot", height = "100%")
       )
    } else if (current == "dgea") {
       htmlTemplate(template_file,
         plot_volcano = plotOutput("volcano_plot", height = "100%"),
         dge_table = uiOutput("dge_table_ui")
       )
    } else if (current == "pathway") {
       htmlTemplate(template_file,
         plot_pathway = plotOutput("pathway_plot", height = "100%")
       )
    } else {
       htmlTemplate(template_file)
    }
  })
  
  # -- Mock Plots --
  output$pca_plot <- renderPlot({
    par(bg = NA)
    plot(rnorm(12, mean=5), rnorm(12, mean=5), pch = 21, bg = rep(c("#0d9488", "#3b82f6", "#a78bfa"), each = 4),
         cex = 2, xlab = "PC1 (45%)", ylab = "PC2 (21%)", axes = FALSE)
    axis(1); axis(2)
    grid()
  })
  
  output$heatmap_plot <- renderPlot({
    par(bg = NA)
    mat <- matrix(rnorm(144) + 10, 12, 12)
    heatmap(mat, Rowv = NA, Colv = NA, labRow = paste0("Sample_", 1:12), labCol = paste0("Sample_", 1:12),
            col = hcl.colors(12, "Teal", rev = TRUE))
  })

  output$volcano_plot <- renderPlot({
    par(bg = NA)
    fc <- rnorm(500, sd=2)
    pwal <- -log10(runif(500))
    col <- rep("#cbd5e1", 500)
    col[fc > 1 & pwal > 1.3] <- "#ef4444" 
    col[fc < -1 & pwal > 1.3] <- "#3b82f6"
    plot(fc, pwal, pch = 19, col = col, xlab = "Log2 Fold Change", ylab = "-Log10 P-value", axes = FALSE)
    axis(1); axis(2)
    abline(h = 1.3, col = "gray", lty = 2)
    abline(v = c(-1, 1), col = "gray", lty = 2)
  })

  output$dge_table_ui <- renderUI({
     # Mock Data
     df <- data.frame(
       Symbol = c("IL6", "TNF", "TP53", "EGFR", "CXCL8"),
       ID = c("ENSG00000136244", "ENSG00000232810", "ENSG00000141510", "ENSG00000146648", "ENSG00000169429"),
       LogFC = c(4.23, 3.89, -2.15, -1.85, 3.12),
       PVal = c("1.2e-12", "2.4e-11", "5.6e-09", "1.1e-08", "3.2e-10"),
       AdjP = c("4.5e-10", "8.1e-10", "1.2e-07", "3.4e-07", "9.5e-09"),
       Reg = c("UP", "UP", "DOWN", "DOWN", "UP")
     )
     
     rows <- lapply(1:nrow(df), function(i) {
        row <- df[i,]
        fc_col <- if(row$Reg == "UP") "text-red-600" else "text-blue-600"
        reg_cls <- if(row$Reg == "UP") "bg-red-50 text-red-600 border-red-100" else "bg-blue-50 text-blue-600 border-blue-100"
        
        tags$tr(class="hover:bg-slate-50 transition-colors",
          tags$td(class="px-6 py-4 font-bold text-slate-900", row$Symbol),
          tags$td(class="px-6 py-4 font-mono text-slate-500", row$ID),
          tags$td(class=paste("px-6 py-4 font-medium", fc_col), 
             paste0(if(row$LogFC > 0) "+" else "", row$LogFC)
          ),
          tags$td(class="px-6 py-4", row$PVal),
          tags$td(class="px-6 py-4", row$AdjP),
          tags$td(class="px-6 py-4", 
             tags$span(class=paste("px-2 py-1 rounded text-xs border font-semibold", reg_cls), row$Reg)
          )
        )
     })
     
     tags$table(class="w-full text-left text-sm text-slate-600",
        tags$thead(class="bg-gray-50 text-slate-700 uppercase text-xs tracking-wider border-b border-gray-200",
           tags$tr(
             tags$th(class="px-6 py-4 font-semibold", "Gene Symbol"),
             tags$th(class="px-6 py-4 font-semibold", "Gene ID"),
             tags$th(class="px-6 py-4 font-semibold", "Log2 FC"),
             tags$th(class="px-6 py-4 font-semibold", "P-Value"),
             tags$th(class="px-6 py-4 font-semibold", "Adj. P-Value"),
             tags$th(class="px-6 py-4 font-semibold", "Regulation")
           )
        ),
     )
  })
  
  output$pathway_plot <- renderPlot({
    par(bg = NA, mar = c(5, 15, 4, 2))
    pathways <- paste("Pathway", 1:10)
    gene_ratio <- runif(10, 0.1, 0.5)
    count <- sample(10:50, 10)
    p_adj <- runif(10, 0, 0.05)
    
    # Color mapping (Red to Blue)
    cols <- colorRampPalette(c("#ef4444", "#3b82f6"))(10)[cut(p_adj, 10)]
    
    plot(gene_ratio, 1:10, pch = 19, cex = count/10, col = cols,
         yaxt = "n", ylab = "", xlab = "Gene Ratio", main = "Top Enriched Pathways",
         xlim = c(0, 0.6))
    axis(2, at = 1:10, labels = pathways, las = 2)
    grid()
  })
  
  # -- Navigation Handlers --
  # We will need to use shinyjs or 'onclick' bindings in the HTML to update 'page'
  # For now, we can manually test by changing the default or using query params.
}

shinyApp(ui, server)
