interface IPostShortVersion {
  abbreviation?: string | null
  acronym?: string | null
  body?: string | null
  fileUnder?: string | null
  initialism?: string | null
  slug?: string | null
  title?: string | null
}

interface IPostShortData {
  versions: IPostShortVersion[]
}

export interface IPostShort {
  postTitle?: string
  isLoading?: boolean
  postData?: IPostShortData | null
  className?: string
}
