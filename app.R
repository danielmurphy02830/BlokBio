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
    } else if (current == "workspaces") {
       projects <- StorageService$list_projects()
       
       project_rows <- lapply(1:nrow(projects), function(i) {
         p <- projects[i,]
         # Mock status color
         status_col <- switch(p$Status, 
            "QC Passed" = "bg-emerald-500", 
            "Processing" = "bg-teal-500", 
            "Pending" = "bg-amber-500",
            "bg-slate-400")
            
         tags$tr(class="group hover:bg-slate-50 transition-colors",
           tags$td(class="py-4 px-6",
             tags$div(class="flex flex-col",
               tags$span(class="text-sm font-medium text-slate-900", p$ProjectName),
               tags$span(class="text-xs text-slate-500", paste0("ID: #", p$ID))
             )
           ),
           tags$td(class="py-4 px-6",
             tags$div(class="flex items-center gap-2",
               tags$span(class=paste("h-2.5 w-2.5 rounded-full", status_col)),
               tags$span(class="text-sm text-slate-700", p$Status)
             )
           ),
           tags$td(class="py-4 px-6",
             tags$div(class="flex items-center gap-2",
               tags$div(class="size-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600",
                 substr(p$Owner, 1, 1) # Simple initial
               ),
               tags$span(class="text-sm text-slate-600", p$Owner)
             )
           ),
           tags$td(class="py-4 px-6 text-right",
             tags$button(class="text-slate-400 hover:text-primary transition-colors",
               tags$span(class="material-symbols-outlined", "more_vert")
             )
           )
         )
       })
       
       htmlTemplate(template_file,
         projects_table = tagList(project_rows)
       )
    } else if (current == "contrast") {
       # Mock Data for Contrast
       count_a <- 345
       count_b <- 1203
       count_overlap <- 142
       
       df <- data.frame(
        Gene = c("TP53", "BRCA1", "EGFR", "MYC", "VEGFA", "KRAS", "AKT1", "PTEN", "CDK4", "RB1"),
        Log2FC = c(2.45, -1.82, 3.10, 1.55, -2.01, 4.12, 1.67, -1.45, 2.88, -3.01),
        AdjP = c(1.2e-8, 4.5e-6, 2.1e-12, 0.001, 1.8e-4, 9.2e-20, 0.004, 0.032, 3.3e-9, 1.1e-15),
        stringsAsFactors = FALSE
       )
       
       rows <- lapply(1:nrow(df), function(i) {
          row <- df[i,]
          fc_col <- if(row$Log2FC > 0) "text-emerald-600" else "text-red-500"
          
          tags$tr(class="hover:bg-slate-50 group transition-colors cursor-pointer",
            tags$td(class="py-3 px-4 font-semibold text-primary", row$Gene),
            tags$td(class=paste("py-3 px-4 text-right font-mono font-medium", fc_col), 
               paste0(if(row$Log2FC > 0) "+" else "", sprintf("%.2f", row$Log2FC))
            ),
            tags$td(class="py-3 px-4 text-right font-mono text-slate-500", format(row$AdjP, scientific=TRUE, digits=3))
          )
       })
       
       htmlTemplate(template_file,
         count_a = count_a,
         count_b = count_b,
         count_overlap = count_overlap,
         contrast_table = tagList(rows)
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
