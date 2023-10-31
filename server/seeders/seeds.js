const db = require('../config/connection');
const { Profile, Item } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const itemSeeds = require('./itemSeed.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    const allProfiles = await Profile.create(profileSeeds);

    await Item.deleteMany({});
    const allItems = await Item.create(itemSeeds);

    for (let item of allItems) {
      const owner = allProfiles[Math.floor(Math.random() * allProfiles.length)]; // Select a random owner profile
      item.itemOwner = owner._id; // Assign the itemOwner to the selected profile
      await item.save(); // Save the updated item
    }

    console.log('All items are now associated with their respective owners!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
