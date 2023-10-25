const { AuthenticationError } = require("apollo-server-express");
const { Profile, Item } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      const allProfiles = await Profile.find();
      return allProfiles;
    },
    profile: async (parent, { profileId }) => {
      return await Profile.findOne({ _id: profileId });
    },
    items: async () => {
      return await Item.find();
    },
    item: async (parent, { itemId }) => {
      return await Item.findOne({ _id: itemId });
    },
    rentable_items: async (parent, { profileId }) => {
      try {
        const user = await Profile.findOne({ _id: profileId }).populate('rentable_items');
  
        if (!user) {
          throw new Error("User not found");
        }
  
        return user.rentable_items; // This should be populated correctly.
      } catch (error) {
        throw new Error("Error fetching rentable items: " + error.message);
      }
    },
  },

  Mutation: {
    addProfile: async (parent, { email, password, city }) => {
      const profile = await Profile.create({ email, password, city });
      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile found with this email address");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(profile);

      return { token, profile };
    },

    addItem: async (parent, { itemName, description, itemPrice, city }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      const newItem = await Item.create({
        itemName,
        description,
        itemPrice,
        city,
        itemOwner: context.user._id,
        availability: true,
      });

      await Profile.findByIdAndUpdate(context.user._id, {
        $push: { rentable_items: newItem._id },
      });

      return newItem;
    },

    rentItem: async (parent, { _id }, context) => {
      const rented = await Item.findOneAndUpdate(
        { _id },
        { availability: false },
        { new: true }
      );

      await Profile.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { rentedItems: rented._id } },
        { new: true }
      );

      if (!rented) {
        throw new AuthenticationError("Item is not available");
      }

      return rented;
    },

    removeItem: async (parent, { _id }) => {
      return await Item.findOneAndRemove({ _id });
    },
  },
};

module.exports = resolvers;
