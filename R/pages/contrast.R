#' Render Contrast Page
#' @description Generates the HTML for the contrast comparison page
render_contrast_page <- function(template_file) {
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
}
