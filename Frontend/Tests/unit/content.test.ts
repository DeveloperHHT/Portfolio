import { describe, expect, it } from 'vitest'
import { en } from '../../src/content/en'
import { tr } from '../../src/content/tr'
import type { Content } from '../../src/content/types'

/** Describes the shape of a value (keys and array lengths) without its text. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]))
  }
  return typeof value
}

function allStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(allStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings)
  return []
}

describe.each([
  ['en', en],
  ['tr', tr],
] as [string, Content][])('%s content', (_name, content) => {
  it('has a nav entry for every section id that exists on the page', () => {
    const ids = content.nav.map((item) => item.id)
    expect(ids).toEqual(['about', 'focus', 'experience', 'work', 'stack', 'offduty', 'contact'])
  })

  it('has no empty strings except the optional repo name', () => {
    const empty = allStrings(content).filter((text) => text.trim() === '')
    expect(empty).toEqual([])
  })

  it('does not publish private contact details', () => {
    // URLs are excluded from the phone check: profile ids can be long digit runs.
    const plain = allStrings(content).filter((text) => !text.startsWith('http'))
    const text = plain.join('\n')
    expect(allStrings(content).join('\n')).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+\.\w+/) // e-mail address
    expect(text).not.toMatch(/\+?\d[\d\s().-]{8,}\d/) // phone number
  })

  it('keeps retired or private details out of the copy', () => {
    const text = allStrings(content).join('\n')
    expect(text).not.toMatch(/linktr/i)
    expect(text).not.toMatch(/patchcore/i)
    expect(text).not.toMatch(/master|yüksek lisans/i)
  })

  it('shows the graduation with highlights', () => {
    const school = content.education.schools[0]
    expect(school.status).toMatch(/2023/)
    expect(school.highlights).toHaveLength(3)
  })

  it('lists Google Cloud Run in the stack', () => {
    const items = content.stack.groups.flatMap((group) => group.items)
    expect(items).toContain('Google Cloud Run')
  })

  it('has a Spotify id for every track', () => {
    for (const track of content.music.tracks) {
      expect(track.spotifyId).toMatch(/^[A-Za-z0-9]{22}$/)
    }
  })

  it('only links to https URLs', () => {
    const links = allStrings(content).filter((text) => text.startsWith('http'))
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) expect(link.startsWith('https://')).toBe(true)
  })
})

describe('translations', () => {
  it('have the same structure in both languages', () => {
    expect(shape(tr)).toEqual(shape(en))
  })

  it('actually translate the visible titles', () => {
    expect(tr.hero.tagline).not.toBe(en.hero.tagline)
    expect(tr.about.title).not.toBe(en.about.title)
    expect(tr.focus.areas.map((area) => area.id)).toEqual(en.focus.areas.map((area) => area.id))
  })
})
