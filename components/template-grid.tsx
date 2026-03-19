'use client'

import { useState, useMemo } from 'react'
import { templates } from '@/lib/data'
import { TemplateCard } from './template-card'
import { SidebarFilter } from './sidebar-filter'
import { SearchBar } from './search-bar'

export function TemplateGrid() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(template.category)

      // Type filter
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(template.type)

      return matchesSearch && matchesCategory && matchesType
    })
  }, [searchQuery, selectedCategories, selectedTypes])

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Sidebar */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="mb-4 lg:mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <SidebarFilter
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
          selectedTypes={selectedTypes}
          onTypeChange={setSelectedTypes}
        />
      </div>

      {/* Grid */}
      <div className="flex-1">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
        {filteredTemplates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-lg font-medium text-foreground">No templates found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
