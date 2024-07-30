import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import {
  updateMultipleItemsStatus,
  transformSanityDocument,
} from '../../../utils/helper';
import client from '../../../utils/sanity';

const resolvers = {
  Query: {
    // case number one
    checkAndUpdateStatus: async () => {
      // This query is used in the form when creating orders. Once an order is completed, you can set the item's status to "Not Active."
      // This ensures that sold items will not be visible in the live environment.

      const ids = ['66a8147c58ca7eb40fd34df2'];
      try {
        await updateMultipleItemsStatus(ids, client);
      } catch (error) {
        console.log(error);
      }
    },

    // case number 2
    singleProductSync: async () => {
      try {
        // here is fetch your real data which you want to send to sanity
        // const data = await Inventory.findOne(objFind);
        // sync data with Sanity

        const data = {
          // demo data
          _id: '123',
          title: 'Test Product',
          model: 'Test Model',
          images: ['https://via.placeholder.com/150'],
          price: 10,
          retailPrice: 5,
          // etc
        };
        try {
          const transaction = client.transaction(); // transaction() method is atomic data method
          const sanityDoc = await transformSanityDocument(data, client);
          transaction.createOrReplace(sanityDoc);
          await transaction.commit();
          console.log(`Migrated document with SKU: ${sanityDoc?.sku}`);
        } catch (error) {
          console.log(error, 'error');
        }
        return data;
      } catch (error) {
        throw new Error('Failed Update Inventory');
      }
    },
    bulkUploadProducts: async () => {
      try {
        // const inventory = await Inventory.find({ status: 'available' }).sort({
        //   createdAt: -1,
        // });
        // TODO:pass or fetch your real data in frm of ARRAY
        const inventory = [
          // your data objects
        ];

        const transaction = client.transaction();
        const promises = inventory.map(async (mongoDoc) => {
          const sanityDoc = await transformSanityDocument(mongoDoc, client);
          transaction.createOrReplace(sanityDoc);
          console.log(`Migrated document with SKU: ${mongoDoc.sku}`);
        });

        await Promise.all(promises);
        await transaction.commit();

        console.log('Migration completed successfully.');
        return { success: true };
      } catch (error) {
        console.error('Migration failed:', error);
        return { success: false };
      }
    },
  },
};

const typeDefs = gql`
  type Query {
    checkAndUpdateStatus: String
    singleProductSync: String
    bulkUploadProducts: String
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
