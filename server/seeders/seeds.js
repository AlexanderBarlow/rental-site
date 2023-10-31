const db = require('../config/connection');
const { Profile, Item, Transaction, Credit } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const itemSeeds = require('./itemSeed.json');
const transactionSeeds = require('./transactionsSeed.json');
const creditSeeds = require('./creditSeed.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    const allProfiles = await Profile.create(profileSeeds);

    await Item.deleteMany({});
    const allItems = await Item.create(itemSeeds);

    for (let item of allItems) {
      const owner = allProfiles[Math.floor(Math.random() * allProfiles.length)];
      item.itemOwner = owner._id;
      await item.save();
    }

    await Transaction.deleteMany({});
    await Credit.deleteMany({});

    const transactionsWithUserIds = transactionSeeds.map(transactionSeed => {
      const profile = allProfiles.find(profile => profile._id === transactionSeed.userId);
      if (profile) {
        return { ...transactionSeed, userId: profile._id };
      }
      return null;
    });

    const filteredTransactions = transactionsWithUserIds.filter(transaction => transaction !== null);

    const transactions = await Transaction.create(filteredTransactions);

    const creditsWithUserIds = creditSeeds.map(creditSeed => {
      const profile = allProfiles.find(profile => profile._id === creditSeed.userId);
      if (profile) {
        return { ...creditSeed, userId: profile._id };
      }
      return null;
    });

    const filteredCredits = creditsWithUserIds.filter(credit => credit !== null);

    for (let creditSeed of filteredCredits) {
      creditSeed.transactions = transactions
        .filter(transaction => transaction.userId.toString() === creditSeed.userId.toString())
        .map(transaction => ({
          transactionId: transaction._id,
          amount: transaction.amount,
          description: transaction.description,
        }));
    }

    await Credit.create(filteredCredits);

    console.log('All items are now associated with their respective owners, and transaction and credit data have been added!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
