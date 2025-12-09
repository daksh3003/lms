import React from 'react'


type BookCoverVariant = "extraSmall" | "small" | "regular" | "medium" | "wide";

const variantStyles: Record<BookCoverVariant,string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    regular: 'book-cover_regular',
    medium: 'book-cover_medium',
    wide: 'book-cover_wide',
}
interface Props {
    className?:string,
    variant?: BookCoverVariant,
    coverColor: string,
    coverUrl: string
}
const BookCover = ({
    className,variant="regular",coverColor="#012B48",coverUrl:"https://placehold.co/400x600.png"}:Props) => {
  return (
    <div className='{cn("relative transition-all duration-300,variantStyles}'>BookCover</div>
  )
}

export default BookCover