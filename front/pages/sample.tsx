const sample = () => {
  return(
    <>
    <div className="relative p-9 bg-gray-400">
  Relative parent
  <div className="static p-8 bg-gray-600">
    Static parent
    <div className="absolute p-6 top-0 right-0 bg-gray-800">
      Absolute child
    </div>
    <div className="bg-gray-400 py-4 inline-block">
      Static sibling
    </div>
  </div>
</div>
 </>
  )
}

export default sample