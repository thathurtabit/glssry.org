export interface ITagsListProps {
  tags: string[]
  errorText?: string
  handleOnTagsChange: (tags: string[]) => void
}
