#' Render Workspaces Page
#' @description Generates the HTML for the workspaces/projects list
render_workspaces_page <- function(template_file) {
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
}
