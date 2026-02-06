#' Render Pathway Page
render_pathway_page <- function(template_file) {
  htmlTemplate(template_file,
               plot_pathway = plotOutput("pathway_plot", height = "100%")
  )
}

#' Setup Pathway Server Outputs
setup_pathway_server <- function(output) {
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
}
