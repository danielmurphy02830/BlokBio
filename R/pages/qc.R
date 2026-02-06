#' Render QC Page
render_qc_page <- function(template_file) {
  htmlTemplate(template_file,
               plot_pca = plotOutput("pca_plot", height = "100%"),
               plot_heatmap = plotOutput("heatmap_plot", height = "100%")
  )
}

#' Setup QC Server Outputs
setup_qc_server <- function(output) {
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
}
