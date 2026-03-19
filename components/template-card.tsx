'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Star, Download } from 'lucide-react'
import type { Template } from '@/lib/data'

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:border-muted-foreground/50">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={template.image}
          alt={template.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-3 left-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-xs font-semibold backdrop-blur-sm">
            {template.authorAvatar}
          </div>
        </div>
        {template.price === 0 && (
          <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
            Free
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground transition-colors group-hover:text-primary">
            {template.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {template.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>by</span>
            <span className="flex items-center gap-1">
              <span className="font-medium text-foreground">{template.author}</span>
            </span>
          </div>
          <button className="rounded-md p-1 transition-colors hover:bg-accent">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              {template.rating}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {template.downloads.toLocaleString()}
            </span>
          </div>
          {template.price > 0 && (
            <span className="text-sm font-semibold text-foreground">
              ${template.price}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
