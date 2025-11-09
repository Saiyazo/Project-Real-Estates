const properties = [
  {
    id: "Property A",
    location: "Bangkok",
    price: "3,000,000",
    image: "https://source.unsplash.com/400x300/?bangkok,apartment", // รูปจาก Unsplash
  },
  {
    id: "Property B",
    location: "Bangkok",
    price: "4,200,000",
    image: "https://source.unsplash.com/400x300/?bangkok,building",
  },
  {
    id: "Property C",
    location: "Bangkok",
    price: "2,800,000",
    image: "https://source.unsplash.com/400x300/?bangkok,condo",
  },
  {
    id: "Property D",
    location: "Bangkok",
    price: "5,000,000",
    image: "https://source.unsplash.com/400x300/?bangkok,house",
  },
]

export function fetchPropertys(){
  return properties
}