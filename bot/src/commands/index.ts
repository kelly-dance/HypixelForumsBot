import { Command } from '../types';

import create from './create';
import deleteCmd from './delete';
import inspect from './inspect';
import tags from './tags';
import evalCmd from './eval';
import invite from './invite';
import help from './help';

export default [
  create,
  deleteCmd,
  inspect,
  tags,
  evalCmd,
  invite,
  help,
] as Command[];
