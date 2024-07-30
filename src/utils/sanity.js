import { createClient } from '@sanity/client';

// https://www.sanity.io/docs/client-libraries/js-client
// https://www.sanity.io/docs/data-store/query-cheat-sheet
import conf from './config';

const projectId = conf.get('sanity.projectId');
const dataset = conf.get('sanity.dataset');
const apiVersion = conf.get('sanity.apiVersion');
const token = conf.get('sanity.token');

const client = createClient({
  projectId, // you can find this in sanity.json
  dataset, // or the name you chose in step 1
  token, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion,
});

export default client;

export const fetchAllProducts = async () =>
  client.fetch(`
      *[
      _type == "product" &&
        status == "active" &&
        !(_id in path('drafts.**')) &&
        defined(slug.current)
        ]{
        "id": _id,
        "vendor": vendor->,
        ...
      } | order(listingOrder desc)
  `);

export const algoliaSanityQuery = `
*[
  _type == 'product'
  && status == "active"
  && !(_id in path('drafts.**'))
  && defined(slug.current)
] {
  otherVariants[]{
    _key,
    _type,
    title,
    sku,
    "color":color.hex,
    quantity,
    "inStock": select(quantity > 0 => true,false),
    featuredImage,
    pricing[]{
    _key,
    country,
    discountPrice,
    price
  },
},
  _type,
  _rev,
  "objectID": _id,
  _createdAt,
  "slug":slug.current,
  title,
  body,
  status,
  "categories": categories[]->{
    title,
    "slug": slug.current,
    _id,
  },
  vendor-> {
    title,
    "slug": slug.current,
    logo,
    _id,
  },
  listingOrder,
  tags,
  "mainImage": otherVariants[0].featuredImage,
  "amazonDeal":false,
}`;

export const fetchSingleProduct = async (slug) => {
  try {
    const query = `
      *[_type == "product" &&
       !(_id in path('drafts.**')) && slug.current == $slug][0] {
        ...,
        "id": _id,
        'categories': categories[]->{_id, title, slug},
        "otherVariants": otherVariants[]{
          ...,
          "variantType": {
            ...variantType->{
              name,
              _rev,
              _id,
              _type
            }
          }
        },
        "relatedProducts": *[_type == "product" &&
          references(^.categories[]._ref) &&
          _id != ^.id &&
          _id in path('drafts.**') == false &&
          status == "active"
          ][0...12] {
          ...,
          "id": _id,
          'categories': categories[]->{_id, title, slug},
          "otherVariants": otherVariants[]{
            ...,
            "variantType": {
              ...variantType->{
                name,
                _rev,
                _id,
                _type
              }
            }
          }
        }
      }
    `;

    const result = await client.fetch(query, { slug });
    return result;
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
};
