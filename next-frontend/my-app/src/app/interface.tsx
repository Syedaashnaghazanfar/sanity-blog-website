export default interface simplifiedProduct {
    _id:string
    title: string;
    slug: string;
    author: string;
    body: string;
    mainImage: string;
    
}

// *[_type == "post"][0...3]{
//     _id,
//      title,
//      "slug": slug.current,
//      author,
//      body,
//      "mainImageUrl": main.asset->url,
     
//  }
// *[_type == 'recommand'] [0...8] | order(_createdAt asc) {
//     _id,
//       name,
//       "likedImageUrl": liked.asset->url,
//       type,
//       price,
//       originalPrice,
//       feulCapacity,
//       transmissionn,
//       peopleCapacity,
//       "feulImageUrl": feul.asset->url,
//       "transmissionImageUrl": transmission.asset->url,
//       "capacityImageUrl": capacity.asset->url,
//       buttonText,
//       "slug": slug.current,
//       "categoryName": category->name,
//       "firstImageUrl": images[0].asset->url
//   }