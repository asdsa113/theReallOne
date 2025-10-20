import MediaCard from './MediaCard'

const MediaGrid = ({ items, type }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No items found
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type={type} />
      ))}
    </div>
  )
}

export default MediaGrid

