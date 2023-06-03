import mongoose from 'mongoose';

// User Config
const GameSchema = new mongoose.Schema({
  firstPlayer: { type: Object, required: true },
  secondPlayer: { type: Object, required: true },
  winner: {type: Number, default: 0},
});

export const GameModel = mongoose.model('Game', GameSchema);

// User Actions
export const getGamesByPlayer = (email : string) => GameModel.findOne({
  $or: [
    { 'firstPlayer.email': email },
    { 'secondPlayer.email': email },
  ],
});
export const createGame = (values: Record<string, any>) => new GameModel(values).save().then((game) => game.toObject());
export const deleteGameById = (id: string) => GameModel.findOneAndDelete({ _id: id });