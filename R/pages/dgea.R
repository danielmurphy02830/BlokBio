#' Render DGEA Page
render_dgea_page <- function(template_file) {
  htmlTemplate(template_file,
               plot_volcano = plotOutput("volcano_plot", height = "100%"),
               dge_table = uiOutput("dge_table_ui")
  )
}

#' Setup DGEA Server Outputs
#' @description Defines the reactive outputs (plots/tables) for the DGEA page
setup_dgea_server <- function(output) {
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
               tags$tbody(tagList(rows))
    )
  })
}
