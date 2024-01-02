export interface ITagsListProperties {
  tags: string[]
  errorText?: string
  handleOnTagsChange: (tags: string[]) => void
  disabled?: boolean
}
