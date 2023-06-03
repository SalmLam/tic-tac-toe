import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

// User Config
const GameSchema = new mongoose.Schema({
  firstPlayer: { type: Object, required: true},
  secondPlayer: { type: Object, required: true},
  winner: {type: Number, default: 0},
  board:{type:Array, defaut:[0,0,0,0,0,0,0,0,0]}
});

export const GameModel = mongoose.model('Game', GameSchema);


export const getGamesByPlayer = (id : string) => GameModel.find({
  $or: [
    { 'secondPlayer._id': id },
    { 'firstPlayer._id': id },
  ],
});
export const getGamesByOwner = (id : string) => GameModel.find({
  'firstPlayer._id': id
});
export const addGame = (values: Record<string, any>) => new GameModel(values).save().then((game) => game.toObject());
export const deleteGameById = (id: string) => GameModel.findOneAndDelete({ _id: id });
export const getGameById = (id: string) => GameModel.findById(id);
