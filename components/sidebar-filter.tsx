'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { categories } from '@/lib/data'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface SidebarFilterProps {
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  selectedTypes: string[]
  onTypeChange: (types: string[]) => void
}

export function SidebarFilter({
  selectedCategories,
  onCategoryChange,
  selectedTypes,
  onTypeChange,
}: SidebarFilterProps) {
  const [useCaseOpen, setUseCaseOpen] = useState(true)
  const [typeOpen, setTypeOpen] = useState(true)

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      onCategoryChange([])
      return
    }
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypeChange([...selectedTypes, type])
    }
  }

  const types = [
    { id: 'template', name: 'Templates' },
    { id: 'plugin', name: 'Plugins' },
    { id: 'saas', name: 'SaaS' },
  ]

  return (
    <aside className="w-full space-y-6 lg:w-64">
      <h2 className="text-lg font-semibold">Filter Templates</h2>

      {/* Use Case Filter */}
      <div className="space-y-3">
        <button
          onClick={() => setUseCaseOpen(!useCaseOpen)}
          className="flex w-full items-center justify-between text-sm font-medium"
        >
          Use Case
          {useCaseOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {useCaseOpen && (
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-accent"
              >
                <Checkbox
                  id={`category-${category.id}`}
                  checked={
                    category.id === 'all'
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(category.id)
                  }
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="flex-1 cursor-pointer text-sm text-muted-foreground"
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Type Filter */}
      <div className="space-y-3">
        <button
          onClick={() => setTypeOpen(!typeOpen)}
          className="flex w-full items-center justify-between text-sm font-medium"
        >
          Type
          {typeOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {typeOpen && (
          <div className="space-y-2">
            {types.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-accent"
              >
                <Checkbox
                  id={`type-${type.id}`}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeToggle(type.id)}
                />
                <Label
                  htmlFor={`type-${type.id}`}
                  className="flex-1 cursor-pointer text-sm text-muted-foreground"
                >
                  {type.name}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
