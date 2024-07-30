import randomstring from 'randomstring';
import pkg from 'lodash';
import { Readable } from 'stream';

import allVariantTypes from './variantTypes';
import allBrands from './allBrands';

const { kebabCase, find } = pkg;

export const generateRandomId = () =>
  randomstring.generate({
    length: 24,
    charset: 'hex',
  });

export const slugify = (title, id) => {
  const slug = kebabCase(title);
  const truncatedSlug = slug;
  return `${truncatedSlug}-${id}`;
};

export async function sanityUploadFromUrl(url, client) {
  const { body } = await fetch(url, { responseType: 'stream' });
  if (!body) {
    throw new Error(`No body found for ${url}`);
  }
  let data = null;

  try {
    data = await client.assets.upload('image', Readable.from(body), {
      filename: url.split('/').pop(),
    });
  } catch (error) {
    console.error(`Failed to upload image from ${url}`);
    console.error(error);
  }
  return data;
}
export async function transformSanityDocument(mongoDoc, client) {
  const selectedBrand = find(allBrands, {
    title: mongoDoc?.brand,
  });

  const selectedVariantType = find(allVariantTypes, {
    name: mongoDoc?.variantType,
  });

  const allSpecs = [
    {
      name: 'Height',
      value: `${mongoDoc.units?.height?.toString()} In` || '0',
    },
    {
      name: 'Width',
      value: `${mongoDoc.units?.width?.toString()} In` || '0',
    },
    {
      name: 'Length',
      value: `${mongoDoc?.units?.length?.toString()} In` || '0',
    },
    {
      name: 'Weight',
      value: `${mongoDoc.units?.weight?.toString()} Lb` || '0',
    },
    {
      name: 'Model',
      value: mongoDoc?.model,
    },
    {
      name: 'SKU',
      value: mongoDoc?.sku,
    },
  ];

  const specification = allSpecs
    ? allSpecs.map((item) => ({
        _key: generateRandomId(),
        _type: 'specification',
        name: item?.name,
        value: item.value,
      }))
    : [];

  const otherVariantsData = {
    _key: generateRandomId(),
    _type: 'productVariant',
    title: mongoDoc.title || 'Untitled Variant',
    quantity: mongoDoc.quantity || 1,
    sku: mongoDoc?.sku || randomstring.generate(6),
    color: {
      hex: mongoDoc?.color?.hex || '#fff',
    },
    pricing: [
      {
        _key: randomstring.generate({ length: 24, charset: 'hex' }),
        _type: 'productPricing',
        price: parseFloat(mongoDoc?.price) || 0,
        discountPrice: parseFloat(mongoDoc.retailPrice) || 0,
        country: 'United States of America',
      },
    ],
    productUnits: {
      _type: 'productUnit',
      height: mongoDoc.units?.height?.toString() || '0',
      width: mongoDoc.units?.width?.toString() || '0',
      length: mongoDoc.units?.length?.toString() || '0',
      weight: mongoDoc.units?.weight?.toString() || '0',
    },
    variantType: {
      _ref: selectedVariantType ? selectedVariantType.id : null,
      _type: 'reference',
    },
  };

  const id = mongoDoc?._id?.toString();
  const title = `${mongoDoc?.title} | ${mongoDoc?.model}`;

  let vendor;
  if (selectedBrand?.id) {
    vendor = {
      _ref: selectedBrand ? selectedBrand.id : null,
      _type: 'reference',
    };
  }

  function getCategories() {
    if (mongoDoc?.category) {
      return [
        {
          _type: 'reference',
          _ref: mongoDoc.category,
          _key: generateRandomId(),
        },
      ];
    }
    return [];
  }

  const sanityDoc = {
    _id: `${id}`,
    _type: 'product',
    isFeatured: mongoDoc?.isFeatured || false,
    productType: 'prime',
    title: `${title}` || 'Untitled Product',
    slug: {
      _type: 'slug',
      current: `${slugify(title, id)}`,
    },
    body: mongoDoc.body || '',
    status: mongoDoc?.status || 'active',
    vendor,
    specification,
    ProductWarranty: [
      {
        _key: generateRandomId(),
        _type: 'warrantyItem',
        price: mongoDoc?.productWarranty?.price || 0,
        duration: mongoDoc?.productWarranty?.duration || 0,
        durationUnit: mongoDoc.productWarranty?.durationUnit || 'month',
      },
    ],
    categories: getCategories(),
    shippingCost: [
      {
        _key: generateRandomId(),
        price: parseFloat(mongoDoc?.shippingCost) || 0,
        _type: 'productShipping',
        country: 'United States of America',
      },
    ],
    tags: mongoDoc.keywords
      ? mongoDoc.keywords.split(',').map((tag) => tag.trim())
      : [],
    rating: 5,
    packaging: 'original',
  };

  const uploadPromises = mongoDoc.images
    ? mongoDoc.images.map(async (imageUrl) => {
        const uploadedImage = await sanityUploadFromUrl(imageUrl, client);
        if (uploadedImage) {
          return {
            _key: generateRandomId(),
            _type: 'image',
            asset: { _type: 'reference', _ref: uploadedImage._id },
          };
        }
        return null;
      })
    : [];

  const uploadedImages = await Promise.all(uploadPromises);
  console.log(uploadedImages, 'uploadedImages');

  sanityDoc.otherVariants = [
    {
      ...otherVariantsData,
      featuredImage: uploadedImages[0],
      images: uploadedImages?.filter(Boolean),
    },
  ];

  console.log(sanityDoc, 'sanityDoc');

  return sanityDoc;
}

export async function updateMultipleItemsStatus(itemsToUpdate, client) {
  const query = `*[_type == "product" &&
    status == "active" && _id in $itemsToUpdate]{"id":_id,status}`;
  // N: To minimize unnecessary API calls and avoid extra mutations in Sanity,
  // first ensure that products are not already marked as 'active'.
  // This way, we can skip updates for products that do not need to be changed.
  // Better for bandwidth reasons thats why ima running query here: Dv

  try {
    const products = await client.fetch(query, { itemsToUpdate });
    if (products?.length > 0) {
      const transaction = client.transaction();
      products.forEach(({ id }) => {
        transaction.patch(id, {
          set: { status: 'notActive' },
        });
      });
      await transaction.commit();
      console.log('Batch update completed successfully.');
    } else {
      console.info('There are no active products available for update.');
    }
  } catch (error) {
    console.error('Failed to perform batch update:', error);
  }
}
