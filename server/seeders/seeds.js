const db = require('../config/connection');
const { Profile, Item } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const itemSeeds = require('./itemSeed.json')

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    const allProfiles = await Profile.create(profileSeeds);

    await Item.deleteMany({});
    const allItems = await Item.create(itemSeeds);

  //  console.log(allProfiles);
  //   console.log(allItems);

  for (let item of allItems) {
    const person = allProfiles[Math.floor(Math.random()*allProfiles.length)]
    await Profile.findOneAndUpdate({ _id: person._id}, {$addToSet: {rentable_items: item._id}})
  }


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});