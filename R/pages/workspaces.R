#' Workspaces Module UI
workspacesUI <- function(id, template_file) {
  ns <- NS(id)
  
  # Note: The template likely expects 'projects_table' as an argument to htmlTemplate.
  # Since the table is dynamic, we render it in the server and pass it as a uiOutput
  # OR we can render the whole template. 
  # However, the previous pattern was: render_workspaces_page(template_file) -> htmlTemplate(template_file, projects_table = ...)
  # In Shiny modules, we can keep this pattern if the content is static-ish, 
  # or better, make the table a dynamic output in the template.
  
  # Assuming the template has {{ projects_table }}
  
  tagList(
    uiOutput(ns("page_content"))
  )
}

#' Workspaces Module Server
workspacesServer <- function(id, template_file) {
  moduleServer(id, function(input, output, session) {
    
    output$page_content <- renderUI({
      # Use R6 Service
      projects <- storage_service$list_projects()
      
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
    })
  })
}
